package dev.akinkunmi.nowplaying

import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.app.Activity

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(48, 64, 48, 48)
        }

        val title = TextView(this).apply {
            text = "Now Playing"
            textSize = 24f
        }

        val body = TextView(this).apply {
            text = "Enable Notification Listener access for this app. Keep YouTube Music playing and this app will post the current track to your website."
            textSize = 16f
            setPadding(0, 24, 0, 32)
        }

        val button = Button(this).apply {
            text = "Open Notification Access"
            setOnClickListener {
                startActivity(Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS))
            }
        }

        layout.addView(title)
        layout.addView(body)
        layout.addView(button)

        setContentView(layout)
    }
}
