import React from 'react';
import ChatBot from 'react-chatbotify';
import '../css/ChatBot.css'; // Create a separate CSS file for styles

const MyChatBot = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = React.useState({});
  const [showChatbot, setShowChatbot] = React.useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    border: '1px solid #491d8d',
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  };

  const flow = {
    start: {
      message: `Halo ${user?.name ?? 'Login First'}! Is there anything I can assist with?`,
      function: (params) => setForm({ ...form, name: params.userInput }),
      options: ['Refund', 'Contact Us', 'About Kelayo'],
      path: async (params) => {
        switch (params.userInput) {
          case 'Refund':
            return 'refund';
          case 'Contact Us':
            return 'contact_us';
          case 'About Kelayo':
            return 'about_us';
        }
      },
      chatDisabled: true,
    },
    refund: {
      transition: { duration: 0 },
      chatDisabled: true,
      function: (params) => setForm({ ...form, pet_choices: params.userInput }),

      path: async (params) => {
        await params.injectMessage(
          'Sorry, but we currently do not have a refund feature available.'
        );
        return 'prompt_again';
      },
    },
    contact_us: {
      transition: { duration: 0 },
      chatDisabled: true,
      function: (params) => setForm({ ...form, pet_choices: params.userInput }),

      path: async (params) => {
        await params.injectMessage(
          'If you have questions, contact us via email nusantarabyte@support.com'
        );
        return 'prompt_again';
      },
    },
    about_us: {
      transition: { duration: 0 },
      chatDisabled: true,
      function: (params) => setForm({ ...form, pet_choices: params.userInput }),

      path: async (params) => {
        await params.injectMessage(
          'We are Nusantara Byte, a dynamic and talented team dedicated to solving the challenges faced by tourists. Our team members include Dicky Anthony as the Hustler, Mutiara as the Scrum Master, Ulfa and Ahdi as the Hipsters, and Amin and Excel as the Hackers. Together, we have created Kelayo to address and alleviate the difficulties encountered by travelers.'
        );
        return 'prompt_again';
      },
    },
    prompt_again: {
      message: 'Do you need any other help?',
      chatDisabled: true,
      options: ['Yes', 'No'],
      path: async (params) => {
        switch (params.userInput) {
          case 'Yes':
            return 'repeat';
          case 'No':
            return 'end';
        }
      },
    },

    repeat: {
      transition: { duration: 3000 },
      path: 'start',
    },
    end: {
      message: 'Thanks for reaching us!',
      chatDisabled: true,
      path: 'start',
    },
  };

  return (
    <div>
      <button
        className={`chatbot-button ${showChatbot ? 'close' : 'open'}`}
        onClick={toggleChatbot}
      >
        {showChatbot ? '✖️' : '💬'}
      </button>
      {showChatbot && (
        <div className={`chatbot-container ${showChatbot ? 'slide-in' : 'slide-out'}`}>
          <ChatBot
            options={{
              theme: { embedded: true },
              audio: { disabled: false, defaultToggledOn: true, tapToPlay: true },
              chatHistory: { storageKey: 'example_advanced_form' },
              botBubble: { simStream: true },
            }}
            flow={flow}
          />
        </div>
      )}
    </div>
  );
};

export default MyChatBot;
