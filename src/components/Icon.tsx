import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

// ────────────────── ดิสคอร์ด ──────────────────

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

// ────────────────── Goggle ──────────────────

export const GoggleIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      viewBox="0 0 48 48"
      width={size || width}
      {...props}
    >
      <path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
      <path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
      <path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
      <path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
    </svg>
  );
};

export const CartIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.75 3.75 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421a60 60 0 0 0 2.96-7.228a.75.75 0 0 0-.525-.965A61 61 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25zm1.5 18a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m12.75 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0"></path>
  </svg>
)

export const HomeIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    role="presentation"
    width={size || width}
    height={size || height}
    viewBox="0 0 576 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0M571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93"></path>
  </svg>
)
export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
export const SignOut = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" width={size || width} height={size || height} viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M12.232 3.25H9.768c-.813 0-1.469 0-2 .043c-.546.045-1.026.14-1.47.366a3.75 3.75 0 0 0-1.64 1.639c-.226.444-.32.924-.365 1.47c-.043.531-.043 1.187-.043 2v6.464c0 .813 0 1.469.043 2c.045.546.14 1.026.366 1.47a3.75 3.75 0 0 0 1.639 1.64c.444.226.924.32 1.47.365c.531.043 1.187.043 2 .043h2.464c.813 0 1.469 0 2-.043c.546-.045 1.026-.14 1.47-.366a3.75 3.75 0 0 0 1.64-1.639c.226-.444.32-.924.365-1.47c.043-.531.043-1.187.043-2V15a.75.75 0 0 0-1.5 0v.2c0 .852 0 1.447-.038 1.91c-.038.453-.107.714-.207.912c-.216.423-.56.767-.983.983c-.198.1-.459.17-.913.207c-.462.037-1.056.038-1.909.038H9.8c-.852 0-1.447 0-1.91-.038c-.453-.038-.714-.107-.911-.207a2.25 2.25 0 0 1-.984-.983c-.1-.198-.17-.459-.207-.913c-.037-.462-.038-1.057-.038-1.909V8.8c0-.852 0-1.447.038-1.91c.037-.453.107-.714.207-.911a2.25 2.25 0 0 1 .984-.984c.197-.1.458-.17.912-.207c.462-.037 1.057-.038 1.909-.038h2.4c.853 0 1.447 0 1.91.038c.453.037.714.107.912.207c.423.216.767.56.983.984c.1.197.17.458.207.912c.037.462.038 1.057.038 1.909V9a.75.75 0 0 0 1.5 0v-.232c0-.813 0-1.469-.043-2c-.045-.546-.14-1.026-.366-1.47a3.75 3.75 0 0 0-1.639-1.64c-.444-.226-.924-.32-1.47-.365c-.531-.043-1.187-.043-2-.043"></path>
    <path fill="currentColor" d="M12.47 8.47a.75.75 0 1 1 1.06 1.06l-1.72 1.72H20a.75.75 0 0 1 0 1.5h-8.19l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06z"></path>
  </svg>
)
export const ProductIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" width={size || width} height={size || height} viewBox="0 0 32 32" {...props}>
    <path fill="currentColor" d="m22.509 12.689l-6-3.55a1 1 0 0 0-1.018.001l-6 3.55a1 1 0 0 0-.491.86v6.9c0 .354.187.681.491.86l6 3.55a.99.99 0 0 0 1.018 0l6-3.55a1 1 0 0 0 .491-.86v-6.9a1 1 0 0 0-.491-.861M21 19.88l-5 2.958l-5-2.958v-5.76l5-2.958l5 2.958z"></path>
    <path fill="currentColor" d="M6 20.184V11.07l6.2-3.664l-1.017-1.722l-6.692 3.955A1 1 0 0 0 4 10.5v9.684A3 3 0 0 0 2 23c0 1.654 1.346 3 3 3s3-1.346 3-3a3 3 0 0 0-2-2.816M5 24a1.001 1.001 0 0 1 0-2a1.001 1.001 0 0 1 0 2m22-4c-1.654 0-3 1.346-3 3c0 .353.072.687.185 1.002L16 28.838l-6.404-3.784l-1.017 1.722l6.912 4.084a1 1 0 0 0 1.018.001l8.96-5.295c.45.269.97.434 1.531.434c1.654 0 3-1.346 3-3s-1.346-3-3-3m0 4a1.001 1.001 0 0 1 0-2a1.001 1.001 0 0 1 0 2M16 7c.731 0 1.392-.273 1.913-.708L26 11.071V18h2v-7.5a1 1 0 0 0-.491-.861l-8.567-5.062q.056-.28.058-.577c0-1.654-1.346-3-3-3s-3 1.346-3 3s1.346 3 3 3m0-4a1.001 1.001 0 1 1-1 1c0-.552.449-1 1-1"></path>
  </svg>
)
export const ProfileIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    role="presentation"
    width={size || width}
    height={size || height}
    {...props}
    viewBox="0 0 48 48">
    <g fill="currentColor">
      <path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0" />
      <path fillRule="evenodd" d="M23.184 43.984C12.517 43.556 4 34.772 4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20h-.274q-.272 0-.542-.016M11.166 36.62a3.028 3.028 0 0 1 2.523-4.005c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 2.498 4.002A17.94 17.94 0 0 0 42 24c0-9.941-8.059-18-18-18S6 14.059 6 24c0 4.916 1.971 9.373 5.166 12.621" clipRule="evenodd" />
    </g>
  </svg>
)

export const FilterIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    role="presentation"
    width={size || width}
    height={size || height}
    {...props}
    viewBox="0 0 24 24"
  >
    <path fill="currentColor"
      d="M6.532 4.75c-.458 0-.854 0-1.165.03c-.307.028-.685.095-.993.348A1.72 1.72 0 0 0 3.75 6.45c-.002.39.172.726.34.992c.168.27.411.59.695.964l2.596 3.422c.252.332.315.42.359.51q.068.14.099.297c.02.1.023.212.023.634v2.97c0 .238-.001.494.07.738c.062.212.165.41.303.585c.16.2.37.346.562.477l.048.033l.99.683c.166.115.331.23.475.31s.388.202.69.183c.363-.022.69-.208.9-.495c.172-.236.21-.499.224-.663c.014-.166.014-.37.014-.578v-4.243c0-.422.004-.534.023-.634q.03-.157.1-.297c.043-.09.106-.178.358-.51l2.596-3.422c.284-.374.527-.694.696-.964c.167-.266.34-.602.339-.992a1.72 1.72 0 0 0-.624-1.322c-.308-.253-.686-.32-.993-.349c-.311-.029-.707-.029-1.165-.029zM5.251 6.439a.22.22 0 0 1 .057-.134c.024-.007.083-.021.2-.032c.232-.022.556-.023 1.06-.023h6.864c.504 0 .828 0 1.06.023c.117.01.176.025.2.032c.03.033.053.08.057.134a1 1 0 0 1-.11.207c-.128.205-.33.472-.64.881L13.64 8H6.36L6 7.527c-.31-.41-.512-.676-.64-.881a1 1 0 0 1-.11-.207M16.5 9.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5zm-1.5 2.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5zm-.5 2.5a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5zm0 2.5a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5z"></path>
  </svg>
)

export const OrderIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    role="presentation"
    width={size || width}
    height={size || height}
    {...props}
    viewBox="0 0 1024 1024"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M160 144h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V160c0-8.837 7.163-16 16-16m564.314-25.333l181.019 181.02c6.248 6.248 6.248 16.378 0 22.627l-181.02 181.019c-6.248 6.248-16.378 6.248-22.627 0l-181.019-181.02c-6.248-6.248-6.248-16.378 0-22.627l181.02-181.019c6.248-6.248 16.378-6.248 22.627 0M160 544h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16m400 0h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H560c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16"
    ></path>
  </svg>
)

export const PasswordIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width}
    height={size || height}
    aria-hidden="true"
    focusable="false"
    role="presentation"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="currentColor" d="M3 17h18q.425 0 .713.288T22 18t-.288.713T21 19H3q-.425 0-.712-.288T2 18t.288-.712T3 17m1-5.55l-.475.85q-.15.275-.45.35t-.575-.075t-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T1 9.95t.213-.537t.537-.213h.95l-.475-.8q-.15-.275-.075-.575t.35-.45t.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075t.35.45t-.075.575l-.475.8h.95q.325 0 .538.213T7 9.95t-.213.538t-.537.212H5.3l.475.85q.15.275.075.575t-.35.45t-.575.075t-.45-.35zm8 0l-.475.85q-.15.275-.45.35t-.575-.075t-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T9 9.95t.213-.537t.537-.213h.95l-.475-.8q-.15-.275-.075-.575t.35-.45t.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075t.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T15 9.95t-.213.538t-.537.212h-.95l.475.85q.15.275.075.575t-.35.45t-.575.075t-.45-.35zm8 0l-.475.85q-.15.275-.45.35t-.575-.075t-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T17 9.95t.213-.537t.537-.213h.95l-.475-.8q-.15-.275-.075-.575t.35-.45t.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075t.35.45t-.075.575l-.475.8h.95q.325 0 .538.213T23 9.95t-.213.538t-.537.212h-.95l.475.85q.15.275.075.575t-.35.45t-.575.075t-.45-.35z"></path>
  </svg>
)

// ────────────────── ดวงจันทร์ ──────────────────


export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} focusable="false" aria-hidden="true" role="presentation" width={size || width} height={size || height} viewBox="0 0 24 24">
    <g fill="none" stroke="#000" strokeDasharray={4} strokeDashoffset={4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
        <animate id="lineMdMoonRisingFilledAltLoop0" fill="freeze" attributeName="stroke-dashoffset" begin="0.7s;lineMdMoonRisingFilledAltLoop0.begin+6s" dur="0.4s" values="4;0"></animate>
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop0.begin+2s;lineMdMoonRisingFilledAltLoop0.begin+4s" dur="0.4s" values="4;0"></animate>
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop0.begin+1.2s;lineMdMoonRisingFilledAltLoop0.begin+3.2s;lineMdMoonRisingFilledAltLoop0.begin+5.2s" dur="0.4s" values="0;4"></animate>
        <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop0.begin+1.8s" to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"></set>
        <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop0.begin+3.8s" to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"></set>
        <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop0.begin+5.8s" to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"></set>
      </path>
      <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
        <animate id="lineMdMoonRisingFilledAltLoop1" fill="freeze" attributeName="stroke-dashoffset" begin="1.1s;lineMdMoonRisingFilledAltLoop1.begin+6s" dur="0.4s" values="4;0"></animate>
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop1.begin+2s;lineMdMoonRisingFilledAltLoop1.begin+4s" dur="0.4s" values="4;0"></animate>
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop1.begin+1.2s;lineMdMoonRisingFilledAltLoop1.begin+3.2s;lineMdMoonRisingFilledAltLoop1.begin+5.2s" dur="0.4s" values="0;4"></animate>
        <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop1.begin+1.8s" to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"></set>
        <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop1.begin+3.8s" to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"></set>
        <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop1.begin+5.8s" to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"></set>
      </path>
      <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
        <animate id="lineMdMoonRisingFilledAltLoop2" fill="freeze" attributeName="stroke-dashoffset" begin="2s;lineMdMoonRisingFilledAltLoop2.begin+6s" dur="0.4s" values="4;0"></animate>
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop2.begin+2s" dur="0.4s" values="4;0"></animate>
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop2.begin+1.2s;lineMdMoonRisingFilledAltLoop2.begin+3.2s" dur="0.4s" values="0;4"></animate>
        <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop2.begin+1.8s" to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"></set>
        <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop2.begin+5.8s" to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"></set>
      </path>
    </g>
    <path fill="#000" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" transform="translate(0 22)">
      <animateMotion fill="freeze" calcMode="linear" dur="0.6s" path="M0 0v-22"></animateMotion>
    </path>
  </svg>
);

// ────────────────── ดวงอาทิตย์ ──────────────────

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} role="presentation" aria-hidden="true" focusable="false" width={size || width} height={size || height} viewBox="0 0 24 24">
    <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
      <circle cx={12} cy={32} r={6} fill="#fff">
        <animate fill="freeze" attributeName="cy" dur="0.6s" values="32;12"></animate>
      </circle>
      <g>
        <path strokeDasharray={2} strokeDashoffset={2} d="M12 19v1M19 12h1M12 5v-1M5 12h-1">
          <animate fill="freeze" attributeName="d" begin="0.7s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"></animate>
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="2;0"></animate>
        </path>
        <path strokeDasharray={2} strokeDashoffset={2} d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5">
          <animate fill="freeze" attributeName="d" begin="0.9s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"></animate>
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="2;0"></animate>
        </path>
        <animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
      </g>
    </g>
  </svg>
);

// ────────────────── หัวใจ ──────────────────

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

// ────────────────── เสิร์ช ──────────────────

export const SearchIcon: React.FC<IconSvgProps> = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const NextUILogo: React.FC<IconSvgProps> = (props) => {
  const { width, height = 40 } = props;

  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 161 32"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-black dark:fill-white"
        d="M55.6827 5V26.6275H53.7794L41.1235 8.51665H40.9563V26.6275H39V5H40.89L53.5911 23.1323H53.7555V5H55.6827ZM67.4831 26.9663C66.1109 27.0019 64.7581 26.6329 63.5903 25.9044C62.4852 25.185 61.6054 24.1633 61.0537 22.9582C60.4354 21.5961 60.1298 20.1106 60.1598 18.6126C60.132 17.1113 60.4375 15.6228 61.0537 14.2563C61.5954 13.0511 62.4525 12.0179 63.5326 11.268C64.6166 10.5379 65.8958 10.16 67.1986 10.1852C68.0611 10.1837 68.9162 10.3468 69.7187 10.666C70.5398 10.9946 71.2829 11.4948 71.8992 12.1337C72.5764 12.8435 73.0985 13.6889 73.4318 14.6152C73.8311 15.7483 74.0226 16.9455 73.9968 18.1479V19.0773H63.2262V17.4194H72.0935C72.1083 16.4456 71.8952 15.4821 71.4714 14.6072C71.083 13.803 70.4874 13.1191 69.7472 12.6272C68.9887 12.1348 68.1022 11.8812 67.2006 11.8987C66.2411 11.8807 65.3005 12.1689 64.5128 12.7223C63.7332 13.2783 63.1083 14.0275 62.6984 14.8978C62.2582 15.8199 62.0314 16.831 62.0352 17.8546V18.8476C62.009 20.0078 62.2354 21.1595 62.6984 22.2217C63.1005 23.1349 63.7564 23.9108 64.5864 24.4554C65.4554 24.9973 66.4621 25.2717 67.4831 25.2448C68.1676 25.2588 68.848 25.1368 69.4859 24.8859C70.0301 24.6666 70.5242 24.3376 70.9382 23.919C71.3183 23.5345 71.6217 23.0799 71.8322 22.5799L73.5995 23.1604C73.3388 23.8697 72.9304 24.5143 72.4019 25.0506C71.8132 25.6529 71.1086 26.1269 70.3314 26.4434C69.4258 26.8068 68.4575 26.9846 67.4831 26.9663V26.9663ZM78.8233 10.4075L82.9655 17.325L87.1076 10.4075H89.2683L84.1008 18.5175L89.2683 26.6275H87.103L82.9608 19.9317L78.8193 26.6275H76.6647L81.7711 18.5169L76.6647 10.4062L78.8233 10.4075ZM99.5142 10.4075V12.0447H91.8413V10.4075H99.5142ZM94.2427 6.52397H96.1148V22.3931C96.086 22.9446 96.2051 23.4938 96.4597 23.9827C96.6652 24.344 96.9805 24.629 97.3589 24.7955C97.7328 24.9548 98.1349 25.0357 98.5407 25.0332C98.7508 25.0359 98.9607 25.02 99.168 24.9857C99.3422 24.954 99.4956 24.9205 99.6283 24.8853L100.026 26.5853C99.8062 26.6672 99.5805 26.7327 99.3511 26.7815C99.0274 26.847 98.6977 26.8771 98.3676 26.8712C97.6854 26.871 97.0119 26.7156 96.3973 26.4166C95.7683 26.1156 95.2317 25.6485 94.8442 25.0647C94.4214 24.4018 94.2097 23.6242 94.2374 22.8363L94.2427 6.52397ZM118.398 5H120.354V19.3204C120.376 20.7052 120.022 22.0697 119.328 23.2649C118.644 24.4235 117.658 25.3698 116.477 26.0001C115.168 26.6879 113.708 27.0311 112.232 26.9978C110.759 27.029 109.302 26.6835 107.996 25.9934C106.815 25.362 105.827 24.4161 105.141 23.2582C104.447 22.0651 104.092 20.7022 104.115 19.319V5H106.08V19.1831C106.061 20.2559 106.324 21.3147 106.843 22.2511C107.349 23.1459 108.094 23.8795 108.992 24.3683C109.993 24.9011 111.111 25.1664 112.242 25.139C113.373 25.1656 114.493 24.9003 115.495 24.3683C116.395 23.8815 117.14 23.1475 117.644 22.2511C118.16 21.3136 118.421 20.2553 118.402 19.1831L118.398 5ZM128 5V26.6275H126.041V5H128Z"
      />
      <path
        className="fill-black dark:fill-white"
        d="M23.5294 0H8.47059C3.79241 0 0 3.79241 0 8.47059V23.5294C0 28.2076 3.79241 32 8.47059 32H23.5294C28.2076 32 32 28.2076 32 23.5294V8.47059C32 3.79241 28.2076 0 23.5294 0Z"
      />
      <path
        className="fill-white dark:fill-black"
        d="M17.5667 9.21729H18.8111V18.2403C18.8255 19.1128 18.6 19.9726 18.159 20.7256C17.7241 21.4555 17.0968 22.0518 16.3458 22.4491C15.5717 22.8683 14.6722 23.0779 13.6473 23.0779C12.627 23.0779 11.7286 22.8672 10.9521 22.4457C10.2007 22.0478 9.5727 21.4518 9.13602 20.7223C8.6948 19.9705 8.4692 19.1118 8.48396 18.2403V9.21729H9.72854V18.1538C9.71656 18.8298 9.88417 19.4968 10.2143 20.0868C10.5362 20.6506 11.0099 21.1129 11.5814 21.421C12.1689 21.7448 12.8576 21.9067 13.6475 21.9067C14.4374 21.9067 15.1272 21.7448 15.7169 21.421C16.2895 21.1142 16.7635 20.6516 17.0844 20.0868C17.4124 19.4961 17.5788 18.8293 17.5667 18.1538V9.21729ZM23.6753 9.21729V22.845H22.4309V9.21729H23.6753Z"
      />
    </svg>
  );
};

export const PlusIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EditDocumentIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon1 = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const CopyDocumentIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 13.15h-2.17c-1.78 0-3.23-1.44-3.23-3.23V7.75c0-.41-.33-.75-.75-.75H6.18C3.87 7 2 8.5 2 11.18v6.64C2 20.5 3.87 22 6.18 22h5.89c2.31 0 4.18-1.5 4.18-4.18V13.9c0-.42-.34-.75-.75-.75Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M17.82 2H11.93C9.67 2 7.84 3.44 7.76 6.01c.06 0 .11-.01.17-.01h5.89C16.13 6 18 7.5 18 10.18V16.83c0 .06-.01.11-.01.16 2.23-.07 4.01-1.55 4.01-4.16V6.18C22 3.5 20.13 2 17.82 2Z"
        fill="currentColor"
      />
      <path
        d="M11.98 7.15c-.31-.31-.84-.1-.84.33v2.62c0 1.1.93 2 2.07 2 .71.01 1.7.01 2.55.01.43 0 .65-.5.35-.8-1.09-1.09-3.03-3.04-4.13-4.16Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GalleryIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M2.58078 19.0112L2.56078 19.0312C2.29078 18.4413 2.12078 17.7713 2.05078 17.0312C2.12078 17.7613 2.31078 18.4212 2.58078 19.0112Z"
        fill="currentColor"
      />
      <path
        d="M9.00109 10.3811C10.3155 10.3811 11.3811 9.31553 11.3811 8.00109C11.3811 6.68666 10.3155 5.62109 9.00109 5.62109C7.68666 5.62109 6.62109 6.68666 6.62109 8.00109C6.62109 9.31553 7.68666 10.3811 9.00109 10.3811Z"
        fill="currentColor"
      />
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PaymentIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.5 5A4.5 4.5 0 0 0 2 9.5V11h28V9.5A4.5 4.5 0 0 0 25.5 5zM2 22.5V13h28v9.5a4.5 4.5 0 0 1-4.5 4.5h-19A4.5 4.5 0 0 1 2 22.5M21 19a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2z" />
    </svg>
  );
};

export const CanceledIcon = (props: IconSvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41"></path>
    </svg>
  );
};

export const DeliverIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M1.75 13.325q-.425 0-.712-.287t-.288-.713t.288-.712t.712-.288h3.5q.425 0 .713.288t.287.712t-.288.713t-.712.287zM7 20q-1.25 0-2.125-.875T4 17H2.75q-.5 0-.8-.375t-.175-.85l.225-.95h3.125q1.05 0 1.775-.725t.725-1.775q0-.325-.075-.6t-.2-.55h.95q1.05 0 1.775-.725t.725-1.775t-.725-1.775T8.3 6.175H4.5l.15-.6q.15-.7.688-1.137T6.6 4h10.15q.5 0 .8.375t.175.85L17.075 8H19q.475 0 .9.213t.7.587l1.875 2.475q.275.35.35.763t0 .837L22.15 16.2q-.075.35-.35.575t-.625.225H20q0 1.25-.875 2.125T17 20t-2.125-.875T14 17h-4q0 1.25-.875 2.125T7 20M3.75 9.675q-.425 0-.712-.288t-.288-.712t.288-.712t.712-.288h4.5q.425 0 .713.288t.287.712t-.288.713t-.712.287zM7 18q.425 0 .713-.288T8 17t-.288-.712T7 16t-.712.288T6 17t.288.713T7 18m10 0q.425 0 .713-.288T18 17t-.288-.712T17 16t-.712.288T16 17t.288.713T17 18m-1.075-5h4.825l.1-.525L19 10h-2.375z"
      ></path>
    </svg>
  );
};

export const ReceivedIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.409 2.513a3.75 3.75 0 0 0-2.818 0l-2.19.888l9.592 3.73l3.374-1.303a1.8 1.8 0 0 0-.46-.275zM22 7.191l-9.25 3.574v2.3A6.48 6.48 0 0 1 17.5 11c1.747 0 3.332.689 4.5 1.81zm-10.75 3.574v4.945a6.5 6.5 0 0 0-.25 1.791c0 .621.087 1.222.25 1.79v2.397a4 4 0 0 1-.659-.199l-7.498-3.04A1.75 1.75 0 0 1 2 16.827V7.192zM2.633 5.828L12 9.447l3.917-1.514l-9.543-3.71l-3.281 1.33q-.256.104-.46.275M23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-5.458-3.498l.086.015l.063.02l.068.035l.047.032l2.548 2.542l.057.07a.5.5 0 0 1-.695.695l-.07-.057L18 15.707v5.294l-.008.09a.5.5 0 0 1-.402.402l-.09.008l-.09-.008a.5.5 0 0 1-.402-.402L17 21l-.001-5.292l-1.645 1.646l-.07.057a.5.5 0 0 1-.568 0l-.07-.057l-.057-.07a.5.5 0 0 1 0-.568l.057-.07l2.513-2.512l.056-.045l.074-.042l.083-.03l.06-.012l.056-.005z"></path>
    </svg>
  );
};

export const SuccessfulIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.409 2.513a3.75 3.75 0 0 0-2.818 0l-2.19.888l9.592 3.73l3.374-1.303a1.8 1.8 0 0 0-.46-.275zM22 7.191l-9.25 3.574v2.3A6.48 6.48 0 0 1 17.5 11c1.747 0 3.332.689 4.5 1.81zm-10.75 3.574v4.945a6.5 6.5 0 0 0-.25 1.791c0 .621.087 1.222.25 1.79v2.397a4 4 0 0 1-.659-.199l-7.498-3.04A1.75 1.75 0 0 1 2 16.827V7.192zM2.633 5.828L12 9.447l3.917-1.514l-9.543-3.71l-3.281 1.33q-.256.104-.46.275M17.5 23a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11m2.646-7.854a.5.5 0 0 1 .708.707l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.707l1.646 1.647z"></path>
    </svg>
  );
};

export const RefundIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="m17.421 4.992l-3.046 1.219l-7.5-3L8.7 2.48a3.5 3.5 0 0 1 2.6 0l5.757 2.303a1.5 1.5 0 0 1 .364.208m-7.42 2.969l3.028-1.212l-7.5-3l-2.586 1.035a1.5 1.5 0 0 0-.364.208zM2 6.176q0-.166.035-.324L9.5 8.838v3.367a5.5 5.5 0 0 0-.5 2.294c0 .82.18 1.597.5 2.295v.938q-.409-.058-.8-.214l-5.757-2.303A1.5 1.5 0 0 1 2 13.822zm16 0v4.08A5.48 5.48 0 0 0 14.5 9a5.5 5.5 0 0 0-4 1.724V8.838l7.465-2.986q.035.158.035.324m1 8.324a4.5 4.5 0 1 0-9 0a4.5 4.5 0 0 0 9 0m-6.856-.352l.003-.002l2-2a.5.5 0 1 1 .707.707L13.707 14H16.5a.5.5 0 0 1 0 1h-2.793l1.147 1.147a.5.5 0 1 1-.707.707l-2-2a.5.5 0 0 1-.147-.35v-.007a.5.5 0 0 1 .144-.348"></path>
    </svg>
  );
};

export const Cancel = ({ size = 24, width, height, ...otherProps }: IconSvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="none"
      focusable="false"
      role="presentation"
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      {...otherProps}
    >
      <path
        fill="currentColor"
        d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
    </svg>
  );
};

export const ChevronDownIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const EditIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DeleteIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"
      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"
        opacity={0.399}
      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const PlusIcon1 = (props: IconSvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path fill="#fff" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
    </svg>
  )
}
export const MinusIcon1 = (props: IconSvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path fill="#fff" d="M19 12.998H5v-2h14z" />
    </svg>
  )
}

export const DeleteIcon1 = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"

      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"


      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
        color="#F54180"
      />
    </svg>
  );
};

export const AddNoteIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M7.37 22h9.25a4.87 4.87 0 0 0 4.87-4.87V8.37a4.87 4.87 0 0 0-4.87-4.87H7.37A4.87 4.87 0 0 0 2.5 8.37v8.75c0 2.7 2.18 4.88 4.87 4.88Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M8.29 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM15.71 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM12 14.75h-1.69V13c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.75H7c-.41 0-.75.34-.75.75s.34.75.75.75h1.81V18c0 .41.34.75.75.75s.75-.34.75-.75v-1.75H12c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DeleteDocumentIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"
      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"
        opacity={0.399}
      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const HeartIcon = ({ fill = "currentColor", filled, size, height, width, ...props }: any) => {
  return (
    <svg
      fill={filled ? fill : "none"}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const CameraIcon = ({ fill = "currentColor", size, height, width, ...props }: any) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};