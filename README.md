VoiceForAll 🤝
Because silence was never a choice

A multilingual, offline communication app for deaf, mute, and non-verbal patients in hospitals and emergencies. Bridges the gap between patients and caregivers — no internet, no translator, no special hardware needed.

Live demo: https://mahalakshmi2101.github.io/VoiceForAll

The Problem

In Indian hospitals, deaf and mute patients face a communication wall. Nurses don't know sign language. Translators aren't always available. Most AAC apps are English-only, need internet, or only solve one side — the patient can speak, but the caregiver still can't respond.

The Solution

VoiceForAll is a two-way communication tool that works on any smartphone browser, fully offline, in 6 Indian languages.

Features
🗣️ AAC Phrase Board
5 categories: Emergency, Hospital, Daily Needs, Emotions, Yes/No
One tap speaks the phrase aloud in the patient's chosen language
Works offline on any device
👐 Gesture Recognition
20 hand gestures detected via device camera using MediaPipe
Gestures map to medical phrases — no tapping needed
Designed for patients with limited hand mobility
🔄 Two-Way Caregiver Panel
After a patient speaks, the screen shows the nurse/doctor a response board
Caregiver taps a response — it shows in giant text and speaks aloud to the patient
Closes the communication loop without a third person
🪪 Patient Profile Card
Stores name, blood group, allergies, emergency contact
Always one tap away — any medical professional can read it instantly
Stored locally, never sent to a server
🌐 6 Indian Languages

English · हिंदी · தமிழ் · తెలుగు · മലയാളം · ಕನ್ನಡ

📳 Haptic Confirmation

Phone vibrates on every gesture or phrase confirmation — deaf users know the app registered their input without looking at the screen

Tech Stack
Frontend: Vanilla JavaScript, HTML, CSS — no frameworks
Gesture detection: MediaPipe Hands (browser-based, no server)
Speech: Web Speech API (TTS + STT)
Storage: localStorage — no backend, no cloud
Deployment: GitHub Pages
Who It's For
Deaf and mute patients
Stroke and trauma patients who temporarily lose speech
Elderly patients with language barriers
Non-verbal children in medical settings
Any patient in an emergency where language is a barrier
How to Run Locally
bash
git clone https://github.com/Mahalakshmi2101/VoiceForAll.git
cd VoiceForAll
# Open with Live Server in VS Code, or any local server
# Do NOT open index.html directly — camera requires a server context
How to Use
Open the app on any smartphone browser (Chrome recommended)
Choose "I need to speak" for the phrase board, or "I am Deaf" for gesture mode
Select your language from the top bar
Tap any phrase — it speaks aloud
Hand the phone to the nurse — they tap a response from the caregiver panel
Set up your patient card once — it's always one tap away
Language Support Note

Full audio support (all 6 languages) works on Android Chrome, which includes Google TTS voices for Indian languages. On Windows Chrome, English and Hindi work natively. Tamil, Telugu, Malayalam, and Kannada display correctly but require Android for audio.

Built By

Mahalakshmi P — Final year B.E. Computer Science, Jeppiaar Engineering College, Chennai