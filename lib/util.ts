export const formatedText = (res: string) => {

let formattedResponse = res ;

// ✅ Handle code blocks ```...```
formattedResponse = formattedResponse.replace(/```([\s\S]*?)```/g, (match, code) => {
  return `
    <pre class="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm mt-2 mb-2">
      <code>${code.trim()}</code>
    </pre>
  `
})

// ✅ Handle inline bold text
formattedResponse = formattedResponse
  .split("**")
  .map((text, index) =>
    index % 2 !== 1
      ? text
      : `<span class='font-bold text-blue-500'>${text}</span>`
  )
  .join("")

// ✅ Replace * with line breaks
formattedResponse = formattedResponse.split("*").join("<br/>")

// ✅ Replace `link` or `inline code`
// formattedResponse = formattedResponse.replace(/`(https?:\/\/[^\s`]+|https?:)`/g, (match, url) => {
//   return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-500">${url}</a>`
// })

// First replace the inline URL markdown
formattedResponse = formattedResponse.replace(
  /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
  (match, text, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-500">${text}</a>`
  }
);

// Then do your existing regex for back-ticked URLs or just protocols
formattedResponse = formattedResponse.replace(
  /`(https?:\/\/[^\s`]+|https?:)`/g,
  (match, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-500">${url}</a>`
  }
);



// ✅ Handle inline code (non-link)
formattedResponse = formattedResponse.replace(/`([^`]+)`/g, (match, code) => {
  // If it’s not a link, render inline code style
  if (code.startsWith("http")) return match // skip — already handled above
  return `<code class="bg-gray-800 text-amber-300 px-1 py-0.5 rounded">${code}</code>`
})


return formattedResponse;
}