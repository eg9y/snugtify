// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;

mod spotify;
mod config;


fn main() -> Result<()> {
    let config_folder = config::get_config_folder_path()?;
    let cache_folder = config::get_cache_folder_path()?;

    let cache_audio_folder = cache_folder.join("audio");
    if !cache_audio_folder.exists() {
        std::fs::create_dir_all(&cache_audio_folder)?;
    }
    let cache_image_folder = cache_folder.join("image");
    if !cache_image_folder.exists() {
        std::fs::create_dir_all(&cache_image_folder)?;
    }
    
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())

        .invoke_handler(tauri::generate_handler![spotify::play_connect])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
