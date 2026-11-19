# Architecture Rules

- Keep guided chatbot journeys deterministic in the client; use the AI service only for free-form questions so core choices stay concise and consistent.- Open the chatbot from any section by dispatching `window` event `open-forzecito`; avoids prop-drilling chat state across sections.
