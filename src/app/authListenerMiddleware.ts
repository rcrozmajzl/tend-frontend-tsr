import { createListenerMiddleware, addListener, isAnyOf } from '@reduxjs/toolkit'
import { store as MyStore } from './store'
import { setAuth, clearAuth } from '../features/authSlice'
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'

// Create the middleware instance and methods
export const authMiddleware = createListenerMiddleware()

export type AuthStartListening = TypedStartListening<RootState, AppDispatch>


// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
export const startAuthListening = authMiddleware.startListening({
    // Listen specifically to auth actions setAuth and clearAuth
    matcher: isAnyOf(setAuth, clearAuth),
    effect: async (action, listenerApi) => {
        listenerApi.unsubscribe()
        
        const authState = (MyStore.getState())


        if (setAuth.match(action)) {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    username: authState.auth.username,
                    email: authState.auth.email,
                    birthdate: authState.auth.birthdate,
                    location: authState.auth.location,
                    avatar: authState.auth.avatar,
                    token: authState.auth.token,
                })
            )
        }
        else {
            localStorage.clear()
        }
    }
}) as unknown as AuthStartListening

export const addAuthListener = addListener as TypedAddListener<RootState, AppDispatch>