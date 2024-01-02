use librespot::core::config::{SessionConfig, ConnectConfig};
use librespot_playback::config::{PlayerConfig, AudioFormat};


#[tauri::command]
pub fn play_connect(username: String, password: String, context_uri: Option<String>) ->  () {
    let session_config = SessionConfig::default();
    let player_config = PlayerConfig::default();
    let audio_format = AudioFormat::default();
    let connect_config = ConnectConfig::default();

}