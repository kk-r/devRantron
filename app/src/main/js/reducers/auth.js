import AUTH from '../consts/auth';
import STATE from '../consts/state';

export const DEFAULT_STATE = {
  authToken: null,
  token: null,
  id: null,
  expire_time: null,
  user_id: null,
  state: STATE.CANCELLED,
};

export default function Auth(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case AUTH.LOGIN:
      switch (action.state) {
        case STATE.SUCCESS: // eslint-disable-line
          const persisAuth = {
            authToken: action.authToken,
            token: action.token,
            id: action.id,
            expire_time: action.expire_time,
            user_id: action.user_id,
            state: action.state,
          };
          return persisAuth;
        case STATE.FAILED:
          return { ...state, token: null, state: action.state };
        case STATE.LOADING:
          return { ...state, state: action.state };
        case STATE.CANCELLED:
          return { ...state, token: null, state: action.state };
        default:
          return { ...state, token: null };
      }
    case AUTH.LOGOUT:
      return { token: null, state: STATE.CANCELLED };
    default:
      return state;
  }
}