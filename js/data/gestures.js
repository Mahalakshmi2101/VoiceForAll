const GESTURES = [
  {
    id: 'help',
    emoji: '🖐️',
    instruction: 'Open palm — ALL 5 fingers spread wide, palm facing camera',
    en:'Help me', hi:'मदद करो', ta:'உதவுங்கள்', te:'సహాయం చేయండి', ml:'സഹായിക്കൂ', kn:'ಸಹಾಯ ಮಾಡಿ'
  },
  {
    id: 'pain',
    emoji: '✊',
    instruction: 'Tight CLOSED FIST — all fingers and thumb curled in completely',
    en:'I am in pain', hi:'मुझे दर्द है', ta:'எனக்கு வலிக்கிறது', te:'నాకు నొప్పిగా ఉంది', ml:'എനിക്ക് വേദനയുണ്ട്', kn:'ನನಗೆ ನೋವಾಗುತ್ತಿದೆ'
  },
  {
    id: 'understand',
    emoji: '👍',
    instruction: 'THUMBS UP — fist, only thumb pointing straight UP, all 4 fingers curled tight',
    en:'I understand / Yes', hi:'समझ गया / हाँ', ta:'புரிகிறது / ஆமாம்', te:'అర్థమైంది / అవును', ml:'മനസ്സിലായി / അതെ', kn:'ಅರ್ಥವಾಯಿತು / ಹೌದు'
  },
  {
    id: 'no',
    emoji: '☝️',
    instruction: 'ONE finger — only INDEX finger pointing straight UP, thumb folded, rest folded',
    en:'No / Wait', hi:'नहीं / रुको', ta:'இல்லை / நிறுத்துங்கள்', te:'కాదు / ఆగండి', ml:'ഇല്ല / നിൽക്കൂ', kn:'ಇಲ್ಲ / ನಿಲ್ಲಿ'
  },
  {
    id: 'yes',
    emoji: '✌️',
    instruction: 'V SIGN — index and middle finger up and APART, all others folded, thumb tucked',
    en:'Yes', hi:'हाँ', ta:'ஆமாம்', te:'అవును', ml:'അതെ', kn:'ಹೌದು'
  },
  {
    id: 'danger',
    emoji: '🤘',
    instruction: 'HORNS — index and pinky up, thumb folded IN, middle and ring folded in',
    en:'I am in danger', hi:'मैं खतरे में हूँ', ta:'நான் ஆபத்தில் இருக்கிறேன்', te:'నేను ప్రమాదంలో ఉన్నాను', ml:'ഞാൻ അപകടത്തിലാണ്', kn:'ನಾನು ಅಪಾಯದಲ್ಲಿದ್ದೇನೆ'
  },
  {
    id: 'family',
    emoji: '🤙',
    instruction: 'SHAKA — thumb and pinky out, index + middle + ring folded tightly into palm',
    en:'Call my family', hi:'घर पर फोन करो', ta:'வீட்டினரை அழையுங்கள்', te:'మా వాళ్ళను పిలవండి', ml:'എന്റെ കുടുംബത്തെ വിളിക്കൂ', kn:'ನನ್ನ ಮನೆಯವರನ್ನು ಕರೆಯಿರಿ'
  },
  {
    id: 'lost',
    emoji: '👆',
    instruction: 'L-SHAPE — thumb and index out at 90°, middle + ring + pinky folded in',
    en:'I am lost', hi:'मैं खो गया हूँ', ta:'நான் தொலைந்துவிட்டேன்', te:'నేను దారి తప్పాను', ml:'ഞാൻ വഴിതെറ്റിപ്പോയി', kn:'ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ'
  },
  {
    id: 'doctor',
    emoji: '🖖',
    instruction: 'VULCAN — all 5 up, press index+middle together, press ring+pinky together, spread a wide gap between the two pairs',
    en:'I need a doctor', hi:'डॉक्टर चाहिए', ta:'டாக்டர் வேண்டும்', te:'నాకు డాక్టర్ కావాలి', ml:'എനിക്ക് ഡോക്ടർ വേണം', kn:'ನನಗೆ ಡಾಕ್ಟರ್ ಬೇಕು'
  },
  {
    id: 'water',
    emoji: '🤟',
    instruction: 'ILY — thumb + index + pinky out, middle + ring folded into palm',
    en:'I need water', hi:'पानी चाहिए', ta:'தண்ணீர் வேண்டும்', te:'నాకు నీళ్ళు కావాలి', ml:'എനിക്ക് വെള്ളം വേണം', kn:'ನನಗೆ ನೀರు ಬೇಕు'
  },
  {
    id: 'medicine',
    emoji: '🤙',
    instruction: 'RING + PINKY — only ring finger and pinky finger up, all others (thumb, index, middle) folded in',
    en:'I need medicine', hi:'दवाई चाहिए', ta:'மருந்து வேண்டும்', te:'నాకు మందు కావాలి', ml:'എനിക്ക് മരുന്ന് വേണം', kn:'ನನಗೆ ಔಷಧ ಬೇಕು'
  },
  {
    id: 'sad',
    emoji: '🤞',
    instruction: 'CROSSED — index and middle finger up and crossed OVER each other so tips touch',
    en:'I am sad', hi:'मैं दुखी हूँ', ta:'மனம் வருந்துகிறேன்', te:'నేను దుఃఖంగా ఉన్నాను', ml:'ഞാൻ ദുഃഖിതനാണ്', kn:'ನಾನು ದుಃಖದಲ್ಲಿದ್ದೇನೆ'
  },
  {
    id: 'scared',
    emoji: '🤏',
    instruction: 'PINCH — thumb and index tips almost touching, middle + ring + pinky curled in',
    en:'I am scared', hi:'मुझे डर लग रहा है', ta:'பயமாக இருக்கிறது', te:'నాకు భయంగా ఉంది', ml:'എനിക്ക് ഭയം തോന്നുന്നു', kn:'ನನಗೆ ಭಯವಾಗುತ್ತಿದೆ'
  },
  {
    id: 'home',
    emoji: '🫲',
    instruction: 'INDEX DOWN — thumb + middle + ring + pinky all up, index finger folded down',
    en:'Take me home', hi:'घर ले चलो', ta:'வீட்டிற்கு அழைத்து செல்லுங்கள்', te:'నన్ను ఇంటికి తీసుకెళ్ళండి', ml:'എന്നെ വീട്ടിൽ കൊണ്ടാക്കൂ', kn:'ನನ್ನನ್ನು ಮನೆಗೆ ಕರೆದೊಯ್ಯಿರಿ'
  },
  {
    id: 'thankyou',
    emoji: '🫳',
    instruction: 'PALM DOWN — all 5 open, rotate hand so palm faces DOWN toward floor',
    en:'Thank you', hi:'धन्यवाद', ta:'நன்றி', te:'ధన్యవాదాలు', ml:'നന്ദി', kn:'ಧನ್ಯವಾದ'
  },
  {
    id: 'police',
    emoji: '👉',
    instruction: 'POINT SIDEWAYS — make a fist, extend only index finger pointing SIDEWAYS (left or right), not up',
    en:'Call police', hi:'पुलिस बुलाओ', ta:'போலீஸ் அழையுங்கள்', te:'పోలీసులను పిలవండి', ml:'പോലീസിനെ വിളിക്കൂ', kn:'ಪೊಲೀಸರನ್ನು ಕರೆಯಿರಿ'
  },
  {
    id: 'repeat',
    emoji: '👎',
    instruction: 'THUMBS DOWN — fist, only thumb pointing straight DOWN toward floor',
    en:'Please repeat', hi:'फिर से बोलो', ta:'மீண்டும் சொல்லுங்கள்', te:'మళ్ళీ చెప్పండి', ml:'വീണ്ടും പറയൂ', kn:'ಮತ್ತೆ ಹೇಳಿ'
  },
  {
    id: 'hungry',
    emoji: '🤲',
    instruction: 'FOUR UP — index + middle + ring + pinky all up, thumb folded in',
    en:'I am hungry', hi:'भूख लगी है', ta:'பசிக்கிறது', te:'నాకు ఆకలిగా ఉంది', ml:'എനിക്ക് വിശക്കുന്നു', kn:'ನನಗೆ ಹಸಿವಾಗಿದೆ'
  },
  {
    id: 'ambulance',
    emoji: '🚑',
    instruction: 'THREE MIDDLE — index + middle + ring up, pinky folded, thumb folded',
    en:'Call ambulance', hi:'एम्बुलेंस बुलाओ', ta:'ஆம்புலன்ஸ் அழையுங்கள்', te:'అంబులెన్స్ పిలవండి', ml:'ആംബുലൻസ് വിളിക്കൂ', kn:'ಆಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ'
  },
  {
    id: 'toilet',
    emoji: '🌸',
    instruction: 'PINKY ONLY — only pinky finger pointing straight up, all other fingers and thumb folded in',
    en:'I need the toilet', hi:'शौचालय जाना है', ta:'கழிவறை வேண்டும்', te:'నాకు టాయిలెట్ కావాలి', ml:'എനിക്ക് ടോയ്‌ലറ്റ് വേണം', kn:'ನನಗೆ ಶೌಚಾಲಯ ಬೇಕು'
  }
];
