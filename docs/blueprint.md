# **App Name**: Be My Valentine?

## Core Features:

- Interactive Question Display: Display the Valentine's Day question with 'YES' and 'NO' buttons, along with background image management.
- Dynamic 'NO' Button Movement: Implement logic to move the 'NO' button randomly within the viewport on hover (desktop) or click (mobile), with movement boundary constraints to prevent it from disappearing.
- Progressive Background Changes: Update the background image based on the number of times the 'NO' button is interacted with, progressing through a series of face images, simulating emotion.
- 'YES' Button Confirmation: Upon clicking the 'YES' button, hide the question and buttons, then show a loading screen with funny messages and animated progress bar.
- Valentine's Final State: Transition to a final happy state with a personalized 'Thank you' message, celebratory background, and subtle confetti effect on the positive event (press of the 'YES' button).

## Style Guidelines:

- Primary color: Soft red (#E57373) to convey romance without being overly aggressive.
- Background color: Light pink (#FCE4EC) to create a soft, romantic backdrop with low saturation.
- Accent color: A slightly brighter pink (#F06292) for button highlights and key interactive elements.
- Font: 'PT Sans' for both body and headline, a modern sans-serif which adds a touch of warmth without being overly formal. 
- Full-screen responsive design with content centered both horizontally and vertically. Ensure button movement does not cause scrollbars.
- Smooth CSS transitions for fading in content, changing background images, and animating the loading bar. Subtle confetti effect for the final positive message.