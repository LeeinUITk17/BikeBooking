// utils.js
const highlightKeyword = (text, keyword, color) => {
    const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedKeyword, 'gi');
    return text.replace(regex, `<span class="highlight" style="background-color:${color};">$&</span>`);
};

// Export the function if you plan to use it in other files
module.exports = {
    highlightKeyword,
};
