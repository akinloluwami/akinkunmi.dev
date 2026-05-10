package dev.akinkunmi.nowplaying

import android.content.ComponentName
import android.graphics.Bitmap
import android.media.MediaMetadata
import android.media.session.MediaController
import android.media.session.MediaSessionManager
import android.service.notification.NotificationListenerService
import android.util.Base64
import android.util.Log
import java.io.ByteArrayOutputStream
import java.net.HttpURLConnection
import java.net.URL
import java.time.Instant
import kotlin.concurrent.thread

class NowPlayingNotificationListener : NotificationListenerService() {
    private var mediaSessionManager: MediaSessionManager? = null
    private var lastSignature: String = ""

    override fun onListenerConnected() {
        super.onListenerConnected()
        mediaSessionManager = getSystemService(MediaSessionManager::class.java)
        readActiveSessions()
    }

    override fun onNotificationPosted(sbn: android.service.notification.StatusBarNotification?) {
        readActiveSessions()
    }

    private fun readActiveSessions() {
        val manager = mediaSessionManager ?: return
        val component = ComponentName(this, NowPlayingNotificationListener::class.java)
        val sessions = manager.getActiveSessions(component)

        sessions
            .firstOrNull { it.packageName == "com.google.android.apps.youtube.music" }
            ?.let(::handleController)
    }

    private fun handleController(controller: MediaController) {
        val metadata = controller.metadata ?: return
        val title = metadata.getString(MediaMetadata.METADATA_KEY_TITLE)?.trim().orEmpty()
        val artist = metadata.getString(MediaMetadata.METADATA_KEY_ARTIST)?.trim().orEmpty()

        if (title.isBlank() || artist.isBlank()) return

        val signature = "$title::$artist"
        if (signature == lastSignature) return
        lastSignature = signature

        val album = metadata.getString(MediaMetadata.METADATA_KEY_ALBUM)?.trim()
        val artwork = metadata.getBitmap(MediaMetadata.METADATA_KEY_ALBUM_ART)
            ?: metadata.getBitmap(MediaMetadata.METADATA_KEY_ART)

        postTrack(
            TrackPayload(
                title = title,
                artist = artist,
                album = album?.ifBlank { null },
                image = artwork?.toDataUrl(),
                source = "android",
                playedAt = Instant.now().toString()
            )
        )
    }

    private fun postTrack(track: TrackPayload) {
        thread {
            try {
                val connection = URL(BuildConfig.NOW_PLAYING_API_URL).openConnection() as HttpURLConnection
                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/json")
                connection.setRequestProperty("Authorization", "Bearer ${BuildConfig.NOW_PLAYING_TOKEN}")
                connection.doOutput = true
                connection.outputStream.use { it.write(track.toJson().toByteArray(Charsets.UTF_8)) }
                connection.inputStream.use { it.readBytes() }
                connection.disconnect()
            } catch (error: Exception) {
                Log.w("NowPlaying", "Failed to post track", error)
            }
        }
    }
}

private data class TrackPayload(
    val title: String,
    val artist: String,
    val album: String? = null,
    val image: String? = null,
    val source: String,
    val playedAt: String
) {
    fun toJson(): String {
        val fields = mutableListOf(
            "\"title\":\"${title.escapeJson()}\"",
            "\"artist\":\"${artist.escapeJson()}\"",
            "\"source\":\"${source.escapeJson()}\"",
            "\"playedAt\":\"${playedAt.escapeJson()}\""
        )

        album?.let { fields.add("\"album\":\"${it.escapeJson()}\"") }
        image?.let { fields.add("\"image\":\"${it.escapeJson()}\"") }

        return "{${fields.joinToString(",")}}"
    }
}

private fun Bitmap.toDataUrl(): String {
    val output = ByteArrayOutputStream()
    compress(Bitmap.CompressFormat.JPEG, 80, output)
    return "data:image/jpeg;base64,${Base64.encodeToString(output.toByteArray(), Base64.NO_WRAP)}"
}

private fun String.escapeJson(): String {
    return buildString {
        for (char in this@escapeJson) {
            when (char) {
                '\\' -> append("\\\\")
                '"' -> append("\\\"")
                '\n' -> append("\\n")
                '\r' -> append("\\r")
                '\t' -> append("\\t")
                else -> append(char)
            }
        }
    }
}
