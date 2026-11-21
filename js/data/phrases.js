const LANG_VOICE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  ml: 'ml-IN',
  kn: 'kn-IN'
};

const LANG_DISPLAY_NAMES = {
  en:  'EN',
  hi:  'हिंदी',
  ta:  'தமிழ்',
  te:  'తెలుగు',
  ml:  'മലയാളം',
  kn:  'ಕನ್ನಡ'
};

const PHRASES = {
  en: {
    emergency: [
      {emoji:'🆘', text:'Help me'},
      {emoji:'🚑', text:'Call ambulance'},
      {emoji:'🔥', text:'Fire! Get out!'},
      {emoji:'👮', text:'Call police'},
      {emoji:'😰', text:'I am in danger'},
      {emoji:'📍', text:'I am lost'}
    ],
    hospital: [
      {emoji:'😣', text:'I am in pain'},
      {emoji:'💊', text:'I need medicine'},
      {emoji:'🩺', text:'I need a doctor'},
      {emoji:'🤢', text:'I feel sick'},
      {emoji:'🩸', text:'I am bleeding'},
      {emoji:'💉', text:'I am allergic'}
    ],
    daily: [
      {emoji:'💧', text:'I need water'},
      {emoji:'🍽️', text:'I am hungry'},
      {emoji:'🚽', text:'I need the toilet'},
      {emoji:'😴', text:'I need to rest'},
      {emoji:'📞', text:'Call my family'},
      {emoji:'🏠', text:'Take me home'}
    ],
    emotions: [
      {emoji:'😢', text:'I am sad'},
      {emoji:'😡', text:'I am angry'},
      {emoji:'😨', text:'I am scared'},
      {emoji:'😊', text:'I am happy'},
      {emoji:'😕', text:'I am confused'},
      {emoji:'🙏', text:'Thank you'}
    ],
    yesno: [
      {emoji:'✅', text:'Yes'},
      {emoji:'❌', text:'No'},
      {emoji:'🤔', text:'Maybe'},
      {emoji:'🔁', text:'Please repeat'},
      {emoji:'⏳', text:'Wait please'},
      {emoji:'👍', text:'I understand'}
    ]
  },

  hi: {
    emergency: [
      {emoji:'🆘', text:'मदद करो'},
      {emoji:'🚑', text:'एम्बुलेंस बुलाओ'},
      {emoji:'🔥', text:'आग! बाहर निकलो!'},
      {emoji:'👮', text:'पुलिस बुलाओ'},
      {emoji:'😰', text:'मैं खतरे में हूँ'},
      {emoji:'📍', text:'मैं खो गया हूँ'}
    ],
    hospital: [
      {emoji:'😣', text:'मुझे दर्द है'},
      {emoji:'💊', text:'दवाई चाहिए'},
      {emoji:'🩺', text:'डॉक्टर चाहिए'},
      {emoji:'🤢', text:'तबियत ठीक नहीं'},
      {emoji:'🩸', text:'खून आ रहा है'},
      {emoji:'💉', text:'मुझे एलर्जी है'}
    ],
    daily: [
      {emoji:'💧', text:'पानी चाहिए'},
      {emoji:'🍽️', text:'भूख लगी है'},
      {emoji:'🚽', text:'शौचालय जाना है'},
      {emoji:'😴', text:'आराम चाहिए'},
      {emoji:'📞', text:'घर पर फोन करो'},
      {emoji:'🏠', text:'घर ले चलो'}
    ],
    emotions: [
      {emoji:'😢', text:'मैं दुखी हूँ'},
      {emoji:'😡', text:'मैं गुस्से में हूँ'},
      {emoji:'😨', text:'मुझे डर लग रहा है'},
      {emoji:'😊', text:'मैं खुश हूँ'},
      {emoji:'😕', text:'मैं confused हूँ'},
      {emoji:'🙏', text:'धन्यवाद'}
    ],
    yesno: [
      {emoji:'✅', text:'हाँ'},
      {emoji:'❌', text:'नहीं'},
      {emoji:'🤔', text:'शायद'},
      {emoji:'🔁', text:'फिर से बोलो'},
      {emoji:'⏳', text:'रुको please'},
      {emoji:'👍', text:'समझ गया'}
    ]
  },

  ta: {
    emergency: [
      {emoji:'🆘', text:'உதவுங்கள்'},
      {emoji:'🚑', text:'ஆம்புலன்ஸ் அழையுங்கள்'},
      {emoji:'🔥', text:'தீ! வெளியே போங்கள்!'},
      {emoji:'👮', text:'போலீஸ் அழையுங்கள்'},
      {emoji:'😰', text:'நான் ஆபத்தில் இருக்கிறேன்'},
      {emoji:'📍', text:'நான் தொலைந்துவிட்டேன்'}
    ],
    hospital: [
      {emoji:'😣', text:'எனக்கு வலிக்கிறது'},
      {emoji:'💊', text:'மருந்து வேண்டும்'},
      {emoji:'🩺', text:'டாக்டர் வேண்டும்'},
      {emoji:'🤢', text:'உடல் நலமில்லை'},
      {emoji:'🩸', text:'ரத்தம் வருகிறது'},
      {emoji:'💉', text:'எனக்கு அலர்ஜி உள்ளது'}
    ],
    daily: [
      {emoji:'💧', text:'தண்ணீர் வேண்டும்'},
      {emoji:'🍽️', text:'பசிக்கிறது'},
      {emoji:'🚽', text:'கழிவறை வேண்டும்'},
      {emoji:'😴', text:'ஓய்வு வேண்டும்'},
      {emoji:'📞', text:'வீட்டினரை அழையுங்கள்'},
      {emoji:'🏠', text:'வீட்டிற்கு அழைத்து செல்லுங்கள்'}
    ],
    emotions: [
      {emoji:'😢', text:'மனம் வருந்துகிறேன்'},
      {emoji:'😡', text:'கோபமாக இருக்கிறேன்'},
      {emoji:'😨', text:'பயமாக இருக்கிறது'},
      {emoji:'😊', text:'மகிழ்ச்சியாக இருக்கிறேன்'},
      {emoji:'😕', text:'குழப்பமாக இருக்கிறது'},
      {emoji:'🙏', text:'நன்றி'}
    ],
    yesno: [
      {emoji:'✅', text:'ஆமாம்'},
      {emoji:'❌', text:'இல்லை'},
      {emoji:'🤔', text:'ஒருவேளை'},
      {emoji:'🔁', text:'மீண்டும் சொல்லுங்கள்'},
      {emoji:'⏳', text:'கொஞ்சம் நிறுத்துங்கள்'},
      {emoji:'👍', text:'புரிகிறது'}
    ]
  },

  te: {
    emergency: [
      {emoji:'🆘', text:'సహాయం చేయండి'},
      {emoji:'🚑', text:'అంబులెన్స్ పిలవండి'},
      {emoji:'🔥', text:'అగ్ని! బయటకు వెళ్ళండి!'},
      {emoji:'👮', text:'పోలీసులను పిలవండి'},
      {emoji:'😰', text:'నేను ప్రమాదంలో ఉన్నాను'},
      {emoji:'📍', text:'నేను దారి తప్పాను'}
    ],
    hospital: [
      {emoji:'😣', text:'నాకు నొప్పిగా ఉంది'},
      {emoji:'💊', text:'నాకు మందు కావాలి'},
      {emoji:'🩺', text:'నాకు డాక్టర్ కావాలి'},
      {emoji:'🤢', text:'నాకు అనారోగ్యంగా ఉంది'},
      {emoji:'🩸', text:'రక్తం వస్తోంది'},
      {emoji:'💉', text:'నాకు అలర్జీ ఉంది'}
    ],
    daily: [
      {emoji:'💧', text:'నాకు నీళ్ళు కావాలి'},
      {emoji:'🍽️', text:'నాకు ఆకలిగా ఉంది'},
      {emoji:'🚽', text:'నాకు టాయిలెట్ కావాలి'},
      {emoji:'😴', text:'నాకు విశ్రాంతి కావాలి'},
      {emoji:'📞', text:'మా వాళ్ళను పిలవండి'},
      {emoji:'🏠', text:'నన్ను ఇంటికి తీసుకెళ్ళండి'}
    ],
    emotions: [
      {emoji:'😢', text:'నేను దుఃఖంగా ఉన్నాను'},
      {emoji:'😡', text:'నాకు కోపంగా ఉంది'},
      {emoji:'😨', text:'నాకు భయంగా ఉంది'},
      {emoji:'😊', text:'నేను సంతోషంగా ఉన్నాను'},
      {emoji:'😕', text:'నాకు అర్థం కావడం లేదు'},
      {emoji:'🙏', text:'ధన్యవాదాలు'}
    ],
    yesno: [
      {emoji:'✅', text:'అవును'},
      {emoji:'❌', text:'కాదు'},
      {emoji:'🤔', text:'బహుశా'},
      {emoji:'🔁', text:'మళ్ళీ చెప్పండి'},
      {emoji:'⏳', text:'దయచేసి వేచి ఉండండి'},
      {emoji:'👍', text:'అర్థమైంది'}
    ]
  },

  ml: {
    emergency: [
      {emoji:'🆘', text:'സഹായിക്കൂ'},
      {emoji:'🚑', text:'ആംബുലൻസ് വിളിക്കൂ'},
      {emoji:'🔥', text:'തീ! പുറത്തു പോകൂ!'},
      {emoji:'👮', text:'പോലീസിനെ വിളിക്കൂ'},
      {emoji:'😰', text:'ഞാൻ അപകടത്തിലാണ്'},
      {emoji:'📍', text:'ഞാൻ വഴിതെറ്റിപ്പോയി'}
    ],
    hospital: [
      {emoji:'😣', text:'എനിക്ക് വേദനയുണ്ട്'},
      {emoji:'💊', text:'എനിക്ക് മരുന്ന് വേണം'},
      {emoji:'🩺', text:'എനിക്ക് ഡോക്ടർ വേണം'},
      {emoji:'🤢', text:'എനിക്ക് അസുഖം തോന്നുന്നു'},
      {emoji:'🩸', text:'രക്തം വരുന്നുണ്ട്'},
      {emoji:'💉', text:'എനിക്ക് അലർജി ഉണ്ട്'}
    ],
    daily: [
      {emoji:'💧', text:'എനിക്ക് വെള്ളം വേണം'},
      {emoji:'🍽️', text:'എനിക്ക് വിശക്കുന്നു'},
      {emoji:'🚽', text:'എനിക്ക് ടോയ്‌ലറ്റ് വേണം'},
      {emoji:'😴', text:'എനിക്ക് വിശ്രമം വേണം'},
      {emoji:'📞', text:'എന്റെ കുടുംബത്തെ വിളിക്കൂ'},
      {emoji:'🏠', text:'എന്നെ വീട്ടിൽ കൊണ്ടാക്കൂ'}
    ],
    emotions: [
      {emoji:'😢', text:'ഞാൻ ദുഃഖിതനാണ്'},
      {emoji:'😡', text:'എനിക്ക് ദേഷ്യം വരുന്നു'},
      {emoji:'😨', text:'എനിക്ക് ഭയം തോന്നുന്നു'},
      {emoji:'😊', text:'ഞാൻ സന്തോഷവാനാണ്'},
      {emoji:'😕', text:'എനിക്ക് ആശയക്കുഴപ്പം ഉണ്ട്'},
      {emoji:'🙏', text:'നന്ദി'}
    ],
    yesno: [
      {emoji:'✅', text:'അതെ'},
      {emoji:'❌', text:'ഇല്ല'},
      {emoji:'🤔', text:'ഒരുപക്ഷേ'},
      {emoji:'🔁', text:'വീണ്ടും പറയൂ'},
      {emoji:'⏳', text:'ദയവായി കാത്തിരിക്കൂ'},
      {emoji:'👍', text:'മനസ്സിലായി'}
    ]
  },

  kn: {
    emergency: [
      {emoji:'🆘', text:'ಸಹಾಯ ಮಾಡಿ'},
      {emoji:'🚑', text:'ಆಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ'},
      {emoji:'🔥', text:'ಬೆಂಕಿ! ಹೊರಗೆ ಹೋಗಿ!'},
      {emoji:'👮', text:'ಪೊಲೀಸರನ್ನು ಕರೆಯಿರಿ'},
      {emoji:'😰', text:'ನಾನು ಅಪಾಯದಲ್ಲಿದ್ದೇನೆ'},
      {emoji:'📍', text:'ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ'}
    ],
    hospital: [
      {emoji:'😣', text:'ನನಗೆ ನೋವಾಗುತ್ತಿದೆ'},
      {emoji:'💊', text:'ನನಗೆ ಔಷಧ ಬೇಕು'},
      {emoji:'🩺', text:'ನನಗೆ ಡಾಕ್ಟರ್ ಬೇಕು'},
      {emoji:'🤢', text:'ನನಗೆ ಅಸ್ವಸ್ಥ ಅನಿಸುತ್ತಿದೆ'},
      {emoji:'🩸', text:'ರಕ್ತ ಬರುತ್ತಿದೆ'},
      {emoji:'💉', text:'ನನಗೆ ಅಲರ್ಜಿ ಇದೆ'}
    ],
    daily: [
      {emoji:'💧', text:'ನನಗೆ ನೀರು ಬೇಕು'},
      {emoji:'🍽️', text:'ನನಗೆ ಹಸಿವಾಗಿದೆ'},
      {emoji:'🚽', text:'ನನಗೆ ಶೌಚಾಲಯ ಬೇಕು'},
      {emoji:'😴', text:'ನನಗೆ ವಿಶ್ರಾಂತಿ ಬೇಕು'},
      {emoji:'📞', text:'ನನ್ನ ಮನೆಯವರನ್ನು ಕರೆಯಿರಿ'},
      {emoji:'🏠', text:'ನನ್ನನ್ನು ಮನೆಗೆ ಕರೆದೊಯ್ಯಿರಿ'}
    ],
    emotions: [
      {emoji:'😢', text:'ನಾನು ದುಃಖದಲ್ಲಿದ್ದೇನೆ'},
      {emoji:'😡', text:'ನನಗೆ ಕೋಪ ಬರುತ್ತಿದೆ'},
      {emoji:'😨', text:'ನನಗೆ ಭಯವಾಗುತ್ತಿದೆ'},
      {emoji:'😊', text:'ನಾನು ಸಂತೋಷದಲ್ಲಿದ್ದೇನೆ'},
      {emoji:'😕', text:'ನನಗೆ ಗೊಂದಲವಾಗಿದೆ'},
      {emoji:'🙏', text:'ಧನ್ಯವಾದ'}
    ],
    yesno: [
      {emoji:'✅', text:'ಹೌದು'},
      {emoji:'❌', text:'ಇಲ್ಲ'},
      {emoji:'🤔', text:'ಬಹುಶಃ'},
      {emoji:'🔁', text:'ಮತ್ತೆ ಹೇಳಿ'},
      {emoji:'⏳', text:'ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ'},
      {emoji:'👍', text:'ಅರ್ಥವಾಯಿತು'}
    ]
  }
};