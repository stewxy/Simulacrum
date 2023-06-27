import { AUTH_TOKEN_STORAGE_KEY } from "./constants";
import { LoginResponse } from "./types/responses/LoginResponse";

export function isLoggedIn() {
    return localStorage.getItem('auth_token') !== null;
}

export function getUserId() {
    return localStorage.getItem('userId');
}

export function login(res: LoginResponse) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, res.token);
    localStorage.setItem('userId', res.userId);
}

export function logout() {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem('userId');
}

export function textCleanse(text: string) {
    return text.replace(/\s/g, '');
}

export function containsProfanity(text: string) {
    var Filter = require('bad-words'),
        filter = new Filter();
    return filter.isProfane(text);

}

export function tagCleanse(array: string[]) {
    for (var i = 0; i < array.length; i++) {
        array[i] = array[i].trim();
        array[i] = array[i].toLowerCase();
        array[i] = array[i].replace("_", "-");
        array[i] = array[i].replace(" ", "-");
        array[i] = array[i].replace(/[^A-Za-z0-9+#_-\s]/g, '');
    }
    return array;
}