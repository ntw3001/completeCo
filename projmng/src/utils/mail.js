import Mailgen from 'mailgen';

const mailgenVerificarionEmail = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: 'Welcome to 3001 Industries. We are always excited, and have you on board',
      action: {
        instructions: 'To get started, press the button.',
        button: {
          color: '#1bc263ff',
          text: 'Yeah!',
          link: verificationUrl,
        },
      },
      outro: 'If you did not create an account, fuck you.',
    },
  };
};

const mailgenPasswordForgetEmail = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: 'Yeah some dummy forgot their email. Wait that was you? Oh I mean uh, some dummy forgot your email',
      action: {
        instruction: 'touch the buton to remember it then dummy',
        button: {
          color: '#830101ff',
          text: 'I am ashamed',
          link: passwordResetUrl,
        }
      }
    }
  }
