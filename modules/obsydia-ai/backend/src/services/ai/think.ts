const OPEN = "<think>";
const CLOSE = "</think>";

function partialSuffix(text: string, tag: string) {
  for (let k = Math.min(tag.length - 1, text.length); k > 0; k--) {
    if (text.endsWith(tag.slice(0, k))) return k;
  }
  return 0;
}

export function createThinkFilter() {
  let inside = false;
  let buffer = "";
  let started = false;
  const emit = (text: string) => {
    if (!started) {
      text = text.replace(/^\s+/, "");
      if (text) started = true;
    }
    return text;
  };
  return {
    push(chunk: string) {
      buffer += chunk;
      let out = "";
      for (;;) {
        if (inside) {
          const end = buffer.indexOf(CLOSE);
          if (end < 0) {
            buffer = buffer.slice(Math.max(0, buffer.length - (CLOSE.length - 1)));
            return emit(out);
          }
          buffer = buffer.slice(end + CLOSE.length);
          inside = false;
          continue;
        }
        const start = buffer.indexOf(OPEN);
        if (start < 0) {
          const keep = partialSuffix(buffer, OPEN);
          out += buffer.slice(0, buffer.length - keep);
          buffer = buffer.slice(buffer.length - keep);
          return emit(out);
        }
        out += buffer.slice(0, start);
        buffer = buffer.slice(start + OPEN.length);
        inside = true;
      }
    },
    flush() {
      const rest = inside ? "" : buffer;
      buffer = "";
      return emit(rest);
    }
  };
}

export function stripThink(text: string) {
  const f = createThinkFilter();
  return f.push(text) + f.flush();
}
