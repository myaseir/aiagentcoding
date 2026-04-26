from gtts import gTTS
from io import BytesIO

class VoiceService:
    @staticmethod
    async def text_to_speech(text: str) -> bytes:
        # We use gTTS for reliability in Pakistan
        try:
            # Generate the TTS using Google's engine
            tts = gTTS(text=text, lang='en', tld='com') # tld='com' ensures standard English
            fp = BytesIO()
            tts.write_to_fp(fp)
            return fp.getvalue()
        except Exception as e:
            print(f"❌ TTS Error: {e}")
            # Return an empty byte string if it totally fails 
            # to prevent the whole backend from crashing
            return b""