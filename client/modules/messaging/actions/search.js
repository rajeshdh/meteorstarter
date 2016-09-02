/**
 * Inspired by http://codepen.io/moroshko/pen/PZWbzK
 */
export default {
  escapeRegexCharacters(str){
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
}
