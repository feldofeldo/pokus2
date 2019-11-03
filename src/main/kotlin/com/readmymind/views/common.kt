package com.readmymind.views

sealed class View {
    object Basic : View()
    object Game : View()
}
