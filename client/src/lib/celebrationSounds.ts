// Create audio elements for celebration sounds
const successSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
const applauseSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2099/2099-preview.mp3');
const cheerSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2153/2153-preview.mp3');

// Set volume levels
successSound.volume = 0.4;
applauseSound.volume = 0.3;
cheerSound.volume = 0.4;

// Preload sounds
successSound.load();
applauseSound.load();
cheerSound.load();

// Function to play a random celebration sound
export const playRandomCelebrationSound = (): void => {
  try {
    // Choose a random sound
    const sounds = [successSound, applauseSound, cheerSound];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    
    // Reset and play the sound
    randomSound.currentTime = 0;
    
    // Play the sound (browsers require user interaction before playing audio)
    const playPromise = randomSound.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Auto-play was prevented, likely due to browser restrictions
        console.log('Audio play prevented by browser:', error);
      });
    }
  } catch (error) {
    console.error('Error playing celebration sound:', error);
  }
};

// Function to play specifically the success sound
export const playSuccessSound = (): void => {
  try {
    successSound.currentTime = 0;
    const playPromise = successSound.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Audio play prevented by browser:', error);
      });
    }
  } catch (error) {
    console.error('Error playing success sound:', error);
  }
};

// Function to play specifically the applause sound
export const playApplauseSound = (): void => {
  try {
    applauseSound.currentTime = 0;
    const playPromise = applauseSound.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Audio play prevented by browser:', error);
      });
    }
  } catch (error) {
    console.error('Error playing applause sound:', error);
  }
};