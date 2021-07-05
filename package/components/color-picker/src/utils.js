function boundValue(value, max) {
  value = Math.min(max, Math.max(0, value));
  if (Math.abs(value - max) < 0.000001) {
    return 1;
  }
  return (value % max) / ~~max;
}
function getHue(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (max === min) {
    return 0;
  }
  if (max === r && g >= b) {
    return (60 * (g - b)) / delta + 0;
  }
  if (max === r && g < b) {
    return (60 * (g - b)) / delta + 360;
  }
  if (max === g) {
    return (60 * (b - r)) / delta + 120;
  }
  if (max === b) {
    return (60 * (r - g)) / delta + 240;
  }
}
const getLightness = (r, g, b) => {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return 0.5 * (max + min);
};
const getSaturation = (r, g, b, l) => {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min || l === 0) {
    return 0;
  }
  if (l > 0 && l <= 0.5) {
    return (max - min) / (max + min);
  }
  if (l > 0.5) {
    return (max - min) / (2 - (max + min));
  }
};
export const rgb2hsv = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const h = getHue(r, g, b);
  const s = max === 0 ? 0 : delta / max;
  const v = max / 255;
  return { h, v, s };
};
export const hsv2hsl = (h, s, v) => {
  return {
    h,
    s: (s * v) / ((h = (2 - s) * v) < 1 ? h : 2 - h) || 0,
    l: h / 2
  };
};
export const rgb2hsl = (r, g, b) => {
  const h = getHue(r, g, b);
  const l = getLightness(r, g, b);
  const s = getSaturation(r, g, b, l);
  return { h, l, s };
};
export const hsv2rgb = (h, s, v) => {
  h = boundValue(h, 360);
  s = boundValue(s * 100, 100);
  v = boundValue(v * 100, 100);

  const i = ~~(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0,
    g = 0,
    b = 0;
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  const round = value => Math.round(value * 255);

  return {
    r: round(r),
    g: round(g),
    b: round(b)
  };
};
function hue2rgb(q, p, h) {
  if (h < 0) h += 1;
  if (h > 1) h -= 1;
  if (6 * h < 1) return q + (p - q) * 6 * h;
  if (2 * h < 1) return p;
  if (3 * h < 2) return q + (p - q) * (2 / 3 - h) * 6;
  return q;
}
export const hsl2rgb = (h, s, l) => {
  let q = null;
  h = h / 360;
  if (s === 0) {
    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    };
  }
  if (l < 0.5) {
    q = l * 1 + s;
  } else {
    q = l + s - l * s;
  }
  let p = 2 * l - q;
  let r = 255 * hue2rgb(q, p, h + 1 / 3);
  let g = 255 * hue2rgb(q, p, h);
  let b = 255 * hue2rgb(q, p, h - 1 / 3);

  return {
    r,
    g,
    b
  };
};
export const hex2rgb = color => {
  color = color.replace(/^#/, "");
  if (color.length === 3) {
    const colors = [];
    for (let i = 0; i < 3; i++) {
      colors.push(color[i], color[i]);
    }
    color = colors.join("");
  }

  const r = parseInt([color[0], color[1]].join(""), 16);
  const g = parseInt([color[2], color[3]].join(""), 16);
  const b = parseInt([color[4], color[5]].join(""), 16);
  const a =
    typeof color[6] !== "undefined" && typeof color[7] !== "undefined"
      ? parseInt([color[6], color[7]].join(""), 16) / 255
      : 1;
  return {
    r,
    g,
    b,
    a
  };
};
export const rgb2hex = (r, g, b, a) => {
  let color = "#";
  [r, g, b, a].forEach(v => {
    let hex = v.toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    color += hex;
  });
  return color;
};
