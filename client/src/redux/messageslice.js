import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selecteduser: null,
  conversationId: null,
  messages: [],
};

const messageSlice = createSlice({
  name: "message",

  initialState,

  reducers: {
    setSelectedUser: (state, action) => {
      state.selecteduser = action.payload;
    },

    setConversationid: (state, action) => {
      state.conversationId = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload || [];
    },

    addMessage: (state, action) => {
  state.messages.push(action.payload);
}
  },
});

export const { setSelectedUser, setMessages,setConversationid,addMessage } = messageSlice.actions;

export default messageSlice.reducer;
