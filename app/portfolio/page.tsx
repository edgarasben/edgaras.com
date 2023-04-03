import Image from 'next/image'
import { AnimateStagger } from './AnimateStagger'
import PortfolioFooter from './PortfolioFooter'
import projects from './data.json'
import { ButtonCalendar } from './ButtonCalendar'
import Link from 'next/link'

type Project = (typeof projects)[0]

export default function PortfolioPage() {
  return (
    <>
      <header className="fixed inset-x-0 h-[614px]">
        <div className="relative flex h-full items-center justify-center">
          {/*      <div className="absolute bottom-0 z-20 block translate-x-48 overflow-hidden">
        <div className="fill-mode-forwards relative h-[440px] w-[490px] bg-[url('/images/header-photo-edgaras.png')] bg-cover bg-center bg-no-repeat object-cover dark:bg-[url('/images/header-photo-edgaras-dark-theme.png')]"></div>
      </div> */}

          <div className="absolute inset-y-0 left-0 -z-10 h-[800px] w-full bg-page md:w-3/5" />
          <div className="absolute inset-0 -z-20 h-[2000px] bg-[#BFDFB4]" />

          <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-12 px-8 md:items-start">
            <h1 className="text-center text-5xl font-extrabold leading-tight md:text-left md:text-6xl md:leading-tight">
              Design simple, <br />
              grow digital 🪴
            </h1>
            {/*    <h1 className="text-6xl font-semibold leading-[4.25rem]">
              Less design, <br />
              more growth 🪴
            </h1> */}
            <ButtonCalendar>Book a Call</ButtonCalendar>
          </div>
        </div>
        <svg
          className="absolute inset-y-0 right-[4%] -z-20 my-auto h-80 w-80 animate-[spin_60s_linear_infinite] text-[#9FC193]"
          viewBox="0 0 265 265"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M164.013 3.58948L161.191 3.06244L158.943 15.0959C158.786 15.9393 158.461 16.6542 157.968 17.2404C157.482 17.8278 156.857 18.245 156.095 18.492C155.341 18.7341 154.49 18.7668 153.543 18.59C152.603 18.4143 151.824 18.0773 151.207 17.5791C150.592 17.0748 150.157 16.4598 149.904 15.7341C149.656 15.0096 149.611 14.2256 149.768 13.3821L152.016 1.3487L149.203 0.823364L146.913 13.0843C146.669 14.389 146.76 15.6023 147.185 16.7241C147.611 17.8398 148.325 18.7897 149.328 19.5736C150.332 20.3514 151.577 20.8792 153.064 21.1568C154.557 21.4357 155.911 21.3936 157.128 21.0306C158.347 20.6615 159.356 20.0336 160.156 19.1468C160.957 18.2539 161.479 17.1551 161.723 15.8505L164.013 3.58948ZM113.432 9.09994L116.428 8.68181L115.477 1.86391L112.481 2.28203L113.432 9.09994ZM112.295 11.8915L113.407 9.10354L107.068 6.51282L105.931 9.30442L112.295 11.8915ZM118.235 11.0625L123.699 6.82451L121.841 4.45103L116.432 8.70764L118.235 11.0625ZM123.513 16.434L124.65 13.6424L118.238 11.0883L117.097 13.8541L123.513 16.434ZM108.741 18.4958L114.153 14.265L112.299 11.9174L106.883 16.1223L108.741 18.4958ZM115.105 21.0829L118.049 20.672L117.101 13.8799L114.157 14.2908L115.105 21.0829ZM88.4552 27.4882L79.9784 10.5241L77.4437 11.7906L83.6689 24.2487L83.5115 24.3273L68.6552 16.1822L66.2861 17.366L74.763 34.3301L77.3225 33.0512L71.1056 20.6097L71.263 20.531L86.1028 28.6637L88.4552 27.4882ZM63.0018 26.5763C62.5292 26.2239 62.0405 25.9551 61.5357 25.7699C61.0324 25.5761 60.521 25.4717 60.0014 25.4566C59.4782 25.4364 58.9523 25.5132 58.4236 25.6869C57.9 25.8569 57.3822 26.1253 56.8703 26.492C56.0021 27.1139 55.3792 27.898 55.0016 28.8443C54.6239 29.7907 54.541 30.841 54.7528 31.9954C54.966 33.1411 55.5184 34.3363 56.4099 35.5809C57.305 36.8306 58.265 37.7414 59.2898 38.3134C60.3146 38.8854 61.3408 39.1413 62.3684 39.0811C63.3959 39.0209 64.3614 38.6672 65.2647 38.0201C66.1028 37.4198 66.7108 36.7261 67.0887 35.9391C67.4715 35.1485 67.6107 34.3198 67.5062 33.4531C67.4078 32.6168 67.0791 31.7929 66.5202 30.9815L62.7121 33.7092L61.3371 31.7896L67.397 27.4488L68.6534 29.2028C69.5809 30.4976 70.1101 31.8195 70.2411 33.1685C70.3735 34.5088 70.1405 35.7843 69.5422 36.995C68.9489 38.2022 68.0299 39.2515 66.7853 40.143C65.3902 41.1424 63.9356 41.6983 62.4215 41.8109C60.9125 41.9198 59.442 41.5949 58.0101 40.8361C56.5745 40.0723 55.2744 38.8774 54.1097 37.2514C53.2289 36.0219 52.6087 34.7956 52.249 33.5725C51.8892 32.3494 51.7736 31.1755 51.902 30.0508C52.0318 28.9175 52.3863 27.8701 52.9656 26.9084C53.5463 25.9381 54.336 25.0953 55.3347 24.3799C56.1678 23.7832 57.0312 23.3507 57.925 23.0826C58.8238 22.8108 59.716 22.6995 60.6017 22.7485C61.4923 22.794 62.3462 22.9948 63.1633 23.3511C63.9768 23.7024 64.7185 24.2077 65.3882 24.867L63.0018 26.5763ZM57.609 47.0745L44.9498 32.9541L42.8193 34.8641L55.4785 48.9845L57.609 47.0745ZM41.4625 43.038C40.7514 42.516 39.976 42.3547 39.1365 42.5543C38.2924 42.7497 37.5019 43.2466 36.765 44.0449C36.2374 44.6165 35.8717 45.1947 35.6679 45.7795C35.4596 46.3601 35.4052 46.9105 35.5046 47.4308C35.6037 47.9423 35.8506 48.3802 36.2452 48.7445C36.5763 49.0502 36.9333 49.2369 37.3161 49.3046C37.703 49.3677 38.0954 49.3477 38.4932 49.2444C38.8906 49.1324 39.2799 48.9792 39.6609 48.7848C40.0374 48.5863 40.3853 48.3824 40.7046 48.173L42.3145 47.1388C42.8337 46.7947 43.402 46.475 44.0192 46.1794C44.6365 45.8839 45.2813 45.6768 45.9537 45.5582C46.6261 45.4395 47.2999 45.465 47.9751 45.6346C48.6545 45.7996 49.3071 46.1711 49.9331 46.7489C50.7224 47.4775 51.2348 48.3285 51.4703 49.3021C51.71 50.2711 51.6509 51.3044 51.2928 52.4022C50.939 53.4953 50.2596 54.5863 49.2547 55.6749C48.2916 56.7182 47.2928 57.4681 46.2582 57.9245C45.2237 58.3809 44.2035 58.544 43.1979 58.4138C42.1878 58.2795 41.2422 57.8477 40.3611 57.1184L42.3082 55.0091C42.8494 55.4331 43.4197 55.6571 44.0192 55.6812C44.6183 55.6965 45.2068 55.555 45.7846 55.2567C46.3621 54.9497 46.9 54.5262 47.3982 53.9864C47.9468 53.3922 48.3416 52.7779 48.5827 52.1436C48.8235 51.5005 48.8995 50.8902 48.8109 50.3127C48.7178 49.7311 48.4444 49.2309 47.9908 48.8121C47.578 48.4311 47.1312 48.2371 46.6503 48.2301C46.1737 48.2186 45.665 48.3329 45.1241 48.5729C44.5875 48.8084 44.0231 49.115 43.4309 49.4925L41.4619 50.7246C40.1279 51.5599 38.8646 52.032 37.672 52.1409C36.4835 52.2452 35.4039 51.8493 34.4332 50.9532C33.6303 50.2121 33.1305 49.3474 32.9337 48.3593C32.7369 47.3711 32.8163 46.3522 33.1718 45.3026C33.5229 44.2489 34.1297 43.2548 34.9922 42.3203C35.8632 41.3768 36.7971 40.6973 37.794 40.2817C38.7951 39.8616 39.7786 39.7109 40.7444 39.8295C41.7057 39.944 42.569 40.3376 43.3342 41.0103L41.4625 43.038ZM20.8262 60.8511L36.3235 71.7814L43.2404 61.9745L41.2275 60.5548L35.9598 68.0235L31.2153 64.6772L36.0613 57.8063L34.0561 56.3919L29.21 63.2628L24.4882 59.9325L29.6918 52.5546L27.679 51.135L20.8262 60.8511ZM30.6379 82.2146L27.853 87.686L10.9521 79.0836L13.8252 73.439C14.6681 71.783 15.7303 70.5331 17.0118 69.6892C18.2879 68.8424 19.7168 68.4234 21.2987 68.432C22.8779 68.4322 24.545 68.879 26.3 69.7723C28.0605 70.6684 29.4097 71.7603 30.3474 73.048C31.2879 74.3302 31.7913 75.7502 31.8574 77.3077C31.9181 78.8625 31.5115 80.4982 30.6379 82.2146ZM26.9228 84.0019L28.3383 81.2208C28.9936 79.9335 29.2961 78.7402 29.246 77.641C29.1904 76.5391 28.8083 75.541 28.0997 74.647C27.3855 73.7501 26.36 72.9615 25.0231 72.281C23.6972 71.6061 22.4644 71.2453 21.3245 71.1985C20.1874 71.1462 19.1681 71.4136 18.2666 72.0007C17.3652 72.5878 16.6008 73.4975 15.9735 74.7299L14.4782 77.6677L26.9228 84.0019ZM11.8904 99.2489L3.53551 101.657L2.65631 104.853L13.3927 101.573L20.9315 109.918L21.8156 106.704L15.9706 100.371L16.0099 100.228L24.2715 97.7758L25.1556 94.5616L14.4364 97.7787L6.86078 89.5677L5.98157 92.764L11.9297 99.106L11.8904 99.2489ZM1.54534 111.898L1.88749 109.048L14.2716 110.535C15.5894 110.693 16.7198 111.143 17.663 111.884C18.6 112.624 19.2923 113.59 19.7399 114.782C20.1814 115.973 20.3117 117.322 20.1307 118.83C19.9504 120.332 19.5049 121.609 18.7941 122.661C18.0771 123.713 17.1759 124.488 16.0902 124.985C14.9985 125.482 13.7937 125.651 12.4759 125.493L0.0917969 124.007L0.432834 121.166L12.5871 122.625C13.4391 122.727 14.2185 122.631 14.9253 122.337C15.6329 122.036 16.2182 121.562 16.6814 120.915C17.1384 120.268 17.424 119.469 17.538 118.519C17.6528 117.562 17.5648 116.716 17.2741 115.978C16.9779 115.234 16.521 114.638 15.9032 114.191C15.2861 113.737 14.5516 113.46 13.6996 113.357L1.54534 111.898ZM263.654 149.95L263.876 147.088L251.67 146.145C250.815 146.079 250.069 145.832 249.434 145.405C248.797 144.985 248.316 144.409 247.988 143.678C247.667 142.953 247.543 142.111 247.617 141.151C247.691 140.197 247.942 139.386 248.372 138.72C248.807 138.054 249.372 137.556 250.066 137.225C250.76 136.901 251.534 136.772 252.39 136.839L264.595 137.782L264.815 134.929L252.38 133.968C251.056 133.866 249.86 134.086 248.79 134.629C247.726 135.172 246.859 135.984 246.187 137.065C245.521 138.147 245.13 139.441 245.014 140.949C244.897 142.463 245.084 143.806 245.575 144.977C246.073 146.149 246.805 147.084 247.773 147.785C248.747 148.485 249.895 148.887 251.218 148.989L263.654 149.95ZM254.02 160.397L262.267 157.642L263.012 154.412L252.422 158.137L244.541 150.114L243.792 153.363L249.897 159.446L249.864 159.59L241.712 162.386L240.963 165.634L251.538 161.972L259.45 169.859L260.195 166.629L253.987 160.541L254.02 160.397ZM235.931 178.284L238.49 172.704L255.729 180.609L253.088 186.366C252.314 188.055 251.303 189.347 250.057 190.243C248.817 191.141 247.406 191.618 245.825 191.674C244.248 191.738 242.564 191.36 240.774 190.539C238.978 189.716 237.585 188.68 236.596 187.431C235.604 186.189 235.043 184.79 234.913 183.237C234.789 181.686 235.129 180.035 235.931 178.284ZM239.57 176.347L238.27 179.183C237.667 180.496 237.414 181.701 237.509 182.797C237.609 183.896 238.032 184.878 238.776 185.742C239.527 186.609 240.583 187.355 241.947 187.98C243.299 188.6 244.546 188.911 245.687 188.911C246.825 188.917 247.833 188.608 248.709 187.985C249.586 187.361 250.313 186.421 250.889 185.164L252.263 182.168L239.57 176.347ZM246.846 198.782L230.883 188.543L224.404 198.644L226.477 199.974L231.412 192.281L236.299 195.416L231.759 202.493L233.824 203.818L238.364 196.741L243.228 199.86L238.353 207.46L240.426 208.79L246.846 198.782ZM226.936 217.548C227.67 218.038 228.451 218.166 229.281 217.93C230.116 217.698 230.884 217.167 231.585 216.337C232.088 215.743 232.428 215.149 232.606 214.556C232.789 213.967 232.819 213.415 232.697 212.899C232.576 212.393 232.31 211.966 231.9 211.619C231.556 211.328 231.191 211.157 230.805 211.106C230.416 211.06 230.025 211.097 229.632 211.218C229.24 211.347 228.858 211.517 228.486 211.728C228.118 211.943 227.779 212.162 227.47 212.385L225.906 213.488C225.403 213.855 224.849 214.199 224.245 214.521C223.641 214.843 223.006 215.078 222.339 215.226C221.673 215.374 220.999 215.378 220.317 215.238C219.631 215.103 218.962 214.76 218.312 214.21C217.492 213.517 216.943 212.689 216.665 211.726C216.383 210.769 216.397 209.734 216.707 208.622C217.013 207.514 217.644 206.394 218.6 205.263C219.517 204.179 220.482 203.386 221.496 202.885C222.509 202.384 223.521 202.176 224.532 202.262C225.547 202.353 226.51 202.743 227.422 203.433L225.569 205.625C225.01 205.225 224.431 205.026 223.831 205.028C223.231 205.039 222.65 205.206 222.085 205.529C221.522 205.861 221.003 206.308 220.529 206.869C220.007 207.486 219.639 208.117 219.426 208.762C219.213 209.415 219.164 210.028 219.278 210.601C219.396 211.178 219.691 211.666 220.162 212.064C220.591 212.427 221.046 212.601 221.527 212.587C222.004 212.578 222.507 212.441 223.037 212.178C223.563 211.919 224.113 211.588 224.688 211.185L226.602 209.869C227.898 208.976 229.139 208.449 230.326 208.288C231.509 208.132 232.605 208.481 233.614 209.334C234.448 210.039 234.985 210.881 235.225 211.86C235.465 212.838 235.43 213.86 235.12 214.924C234.816 215.992 234.253 217.011 233.432 217.983C232.603 218.963 231.699 219.683 230.722 220.142C229.74 220.605 228.764 220.798 227.794 220.722C226.828 220.65 225.949 220.294 225.155 219.655L226.936 217.548ZM210.362 214.457L223.625 228.013L225.67 226.011L212.407 212.456L210.362 214.457ZM206.082 234.934C206.569 235.266 207.069 235.513 207.582 235.676C208.093 235.847 208.609 235.929 209.128 235.922C209.652 235.919 210.174 235.819 210.694 235.622C211.21 235.43 211.716 235.139 212.211 234.75C213.051 234.091 213.639 233.28 213.975 232.318C214.311 231.356 214.348 230.303 214.086 229.159C213.822 228.024 213.218 226.854 212.273 225.65C211.324 224.44 210.325 223.573 209.276 223.046C208.227 222.519 207.191 222.309 206.167 222.414C205.143 222.519 204.194 222.914 203.32 223.6C202.509 224.237 201.932 224.957 201.589 225.759C201.241 226.566 201.138 227.4 201.281 228.261C201.416 229.092 201.78 229.901 202.374 230.687L206.059 227.796L207.517 229.653L201.652 234.255L200.321 232.558C199.337 231.305 198.751 230.007 198.561 228.665C198.37 227.332 198.547 226.048 199.091 224.812C199.631 223.58 200.503 222.491 201.708 221.546C203.058 220.487 204.487 219.868 205.994 219.689C207.497 219.514 208.981 219.774 210.444 220.47C211.912 221.17 213.263 222.307 214.498 223.88C215.432 225.07 216.105 226.268 216.518 227.474C216.931 228.68 217.098 229.848 217.019 230.977C216.939 232.115 216.63 233.177 216.094 234.163C215.556 235.158 214.804 236.035 213.838 236.793C213.031 237.426 212.188 237.895 211.307 238.202C210.421 238.513 209.534 238.664 208.647 238.653C207.755 238.647 206.893 238.484 206.062 238.163C205.233 237.848 204.47 237.376 203.772 236.746L206.082 234.934ZM180.479 235.179L189.7 251.751L192.176 250.373L185.404 238.203L185.558 238.118L200.761 245.596L203.075 244.308L193.854 227.737L191.354 229.128L198.117 241.281L197.963 241.367L182.777 233.901L180.479 235.179ZM156.52 254.503L153.547 255.058L154.811 261.825L157.784 261.27L156.52 254.503ZM157.528 251.662L156.546 254.498L162.997 256.795L164.005 253.954L157.528 251.662ZM151.633 252.763L146.369 257.248L148.335 259.533L153.542 255.033L151.633 252.763ZM146.113 247.64L145.105 250.481L151.628 252.737L152.641 249.922L146.113 247.64ZM160.775 244.901L155.563 249.376L157.524 251.636L162.741 247.187L160.775 244.901ZM154.299 242.609L151.377 243.155L152.636 249.897L155.558 249.351L154.299 242.609ZM106.264 262.199L109.107 262.596L110.8 250.472C110.918 249.622 111.21 248.893 111.675 248.285C112.134 247.676 112.739 247.23 113.489 246.949C114.231 246.672 115.08 246.6 116.034 246.733C116.981 246.866 117.775 247.167 118.413 247.636C119.051 248.111 119.514 248.706 119.801 249.419C120.081 250.131 120.163 250.912 120.044 251.762L118.352 263.886L121.186 264.282L122.91 251.929C123.093 250.614 122.947 249.406 122.471 248.305C121.994 247.21 121.237 246.294 120.199 245.557C119.161 244.826 117.892 244.356 116.395 244.147C114.891 243.937 113.539 244.042 112.34 244.46C111.14 244.885 110.161 245.559 109.403 246.481C108.643 247.41 108.172 248.531 107.989 249.846L106.264 262.199ZM98.1657 260.091L102.847 241.714L105.62 242.42L100.938 260.797L98.1657 260.091ZM94.0568 239.193L88.4205 236.76C86.6522 235.996 84.9942 235.694 83.4464 235.852C81.8961 236.017 80.5108 236.609 79.2905 237.628C78.0646 238.646 77.06 240.061 76.2769 241.875C75.4963 243.682 75.1557 245.374 75.2552 246.951C75.3465 248.53 75.855 249.929 76.7806 251.149C77.7038 252.375 79.0183 253.356 80.7242 254.093L86.5391 256.604L94.0568 239.193ZM87.5739 239.117L90.4388 240.354L84.9033 253.174L81.8769 251.867C80.6074 251.319 79.6512 250.614 79.0083 249.751C78.3654 248.889 78.0342 247.888 78.0146 246.75C77.9893 245.61 78.2715 244.356 78.8613 242.99C79.456 241.613 80.1783 240.54 81.0283 239.771C81.8758 239.007 82.8477 238.563 83.9439 238.437C85.0377 238.318 86.2477 238.545 87.5739 239.117ZM78.0537 231.904L68.1689 248.088L58.0222 241.891L59.306 239.789L67.0109 244.495L70.0227 239.564L62.8473 235.181L64.1263 233.087L71.3018 237.469L74.328 232.515L66.5283 227.751L67.8121 225.649L78.0537 231.904ZM48.6815 230.947C48.4274 230.122 48.5376 229.338 49.0119 228.594L46.8662 226.859C46.2449 227.667 45.9087 228.554 45.8573 229.521C45.8022 230.492 46.0169 231.464 46.5016 232.435C46.9815 233.403 47.7207 234.29 48.7192 235.098C49.708 235.897 50.7397 236.438 51.8142 236.719C52.8848 237.005 53.9067 237.018 54.8799 236.757C55.8531 236.496 56.6832 235.94 57.3702 235.091C58.2008 234.063 58.5252 232.96 58.3433 231.781C58.1567 230.598 57.6029 229.368 56.6821 228.092L55.3238 226.208C54.9084 225.642 54.5656 225.098 54.2954 224.578C54.0205 224.054 53.8732 223.554 53.8535 223.078C53.829 222.598 53.9934 222.139 54.3466 221.702C54.7347 221.222 55.2159 220.917 55.7903 220.786C56.3607 220.659 56.9747 220.695 57.6321 220.894C58.2809 221.093 58.9197 221.446 59.5485 221.955C60.1198 222.417 60.5775 222.926 60.9217 223.482C61.2572 224.039 61.4369 224.617 61.4607 225.216C61.4759 225.816 61.2897 226.399 60.9021 226.967L63.1342 228.772C63.8043 227.845 64.1733 226.873 64.2413 225.857C64.3054 224.845 64.0758 223.837 63.5527 222.835C63.0296 221.832 62.216 220.885 61.112 219.992C59.9599 219.06 58.8268 218.454 57.7128 218.172C56.594 217.887 55.559 217.895 54.6078 218.198C53.6517 218.497 52.836 219.064 52.1607 219.899C51.625 220.561 51.2971 221.237 51.1768 221.926C51.0518 222.611 51.0705 223.285 51.2328 223.948C51.3952 224.611 51.6441 225.241 51.9793 225.837C52.3146 226.434 52.6709 226.98 53.0482 227.476L54.1856 229.015C54.4154 229.32 54.6416 229.653 54.8644 230.016C55.0832 230.384 55.2616 230.762 55.3993 231.151C55.5284 231.541 55.5741 231.932 55.5364 232.322C55.4939 232.708 55.331 233.077 55.0476 233.427C54.7099 233.845 54.2891 234.12 53.7852 234.252C53.2725 234.385 52.7197 234.367 52.1267 234.197C51.5298 234.032 50.9289 233.705 50.3241 233.216C49.4792 232.533 48.9317 231.776 48.6815 230.947ZM38.4045 225.407L51.7164 211.901L53.7543 213.909L40.4424 227.416L38.4045 225.407ZM30.5455 209.677C30.6972 209.161 30.9334 208.656 31.254 208.161L29.3918 205.892C28.7779 206.603 28.3223 207.376 28.0252 208.211C27.7233 209.05 27.5788 209.915 27.5919 210.807C27.6011 211.694 27.7707 212.577 28.1008 213.456C28.427 214.33 28.9152 215.163 29.5653 215.955C30.3446 216.905 31.2374 217.638 32.2437 218.154C33.2413 218.669 34.3098 218.954 35.4492 219.009C36.5799 219.063 37.7436 218.871 38.9405 218.432C40.1373 217.992 41.3203 217.293 42.4894 216.333C44.0355 215.065 45.1426 213.689 45.8105 212.206C46.4737 210.728 46.7015 209.239 46.4938 207.74C46.2822 206.237 45.632 204.822 44.5433 203.495C43.572 202.312 42.4647 201.464 41.2213 200.951C39.9739 200.433 38.6858 200.285 37.3571 200.505C36.0196 200.724 34.7353 201.339 33.5041 202.349L31.8363 203.718L36.5653 209.48L38.3905 207.982L35.4189 204.361C36.1919 203.75 36.9924 203.368 37.8205 203.215C38.6785 203.054 39.5145 203.138 40.3285 203.469C41.1387 203.794 41.8707 204.355 42.5247 205.152C43.2297 206.011 43.6459 206.951 43.7734 207.973C43.9009 208.994 43.7129 210.035 43.2093 211.095C42.7057 212.155 41.8599 213.173 40.6717 214.148C39.4882 215.119 38.3318 215.749 37.2025 216.037C36.0645 216.324 35.011 216.31 34.0419 215.995C33.0729 215.68 32.2496 215.11 31.5721 214.285C31.1726 213.798 30.8708 213.299 30.6668 212.787C30.4588 212.271 30.3477 211.752 30.3335 211.228C30.3145 210.709 30.3851 210.192 30.5455 209.677ZM14.0454 192.006L30.444 182.481L31.7648 184.755L24.5798 200.076L24.6681 200.229L36.6948 193.243L38.1319 195.717L21.7334 205.242L20.4032 202.952L27.5996 187.614L27.5113 187.462L15.4686 194.457L14.0454 192.006ZM10.0307 156.102L10.6427 159.065L3.90114 160.457L3.28909 157.495L10.0307 156.102ZM10.648 159.09L13.5024 160.018L11.3346 166.537L8.47493 165.583L10.648 159.09ZM7.7045 148.968L12.2888 154.145L10.0562 156.097L5.45689 150.977L7.7045 148.968ZM14.4461 147.575L17.3057 148.528L15.1485 155.098L12.3144 154.139L14.4461 147.575ZM15.75 158.009L20.3238 163.135L18.0762 165.144L13.5279 160.013L15.75 158.009ZM21.8901 153.705L22.4916 156.616L15.7755 158.004L15.174 155.093L21.8901 153.705ZM171.475 5.86499L166.031 24.031L163.291 23.2097L168.734 5.04364L171.475 5.86499ZM175.037 26.9942L180.559 29.6771C182.291 30.5188 183.934 30.8949 185.487 30.8054C187.043 30.7104 188.454 30.1809 189.718 29.2167C190.989 28.2553 192.055 26.8861 192.919 25.1093C193.779 23.338 194.195 21.6629 194.166 20.084C194.145 18.5022 193.7 17.0813 192.829 15.8212C191.962 14.5555 190.692 13.5166 189.021 12.7046L183.324 9.93671L175.037 26.9942ZM181.51 27.3595L178.703 25.9958L184.805 13.4359L187.77 14.8765C189.014 15.4808 189.938 16.2282 190.542 17.1186C191.145 18.009 191.432 19.0232 191.4 20.161C191.375 21.3016 191.037 22.541 190.387 23.8791C189.731 25.2284 188.961 26.2684 188.078 26.999C187.197 27.7241 186.206 28.1247 185.106 28.2007C184.008 28.2712 182.809 27.9908 181.51 27.3595ZM190.548 34.8343L201.136 19.1007L211 25.7386L209.625 27.7821L202.134 22.7417L198.909 27.5355L205.884 32.2295L204.514 34.2654L197.539 29.5713L194.297 34.3882L201.88 39.4906L200.505 41.5342L190.548 34.8343ZM219.868 37.0093C220.086 37.8443 219.942 38.623 219.435 39.3453L221.503 41.1723C222.159 40.3926 222.534 39.521 222.627 38.5574C222.725 37.5892 222.553 36.6093 222.111 35.6176C221.674 34.63 220.974 33.7111 220.012 32.861C219.059 32.019 218.051 31.434 216.99 31.106C215.933 30.7734 214.913 30.7163 213.929 30.9346C212.945 31.1529 212.092 31.6714 211.368 32.4903C210.494 33.4803 210.122 34.5683 210.252 35.7542C210.387 36.9442 210.886 38.1969 211.75 39.5124L213.025 41.454C213.415 42.0378 213.734 42.5954 213.981 43.1268C214.233 43.6623 214.359 44.1684 214.357 44.6452C214.361 45.126 214.177 45.577 213.805 45.998C213.396 46.4606 212.902 46.7448 212.322 46.8507C211.747 46.9519 211.135 46.8891 210.487 46.6624C209.848 46.4352 209.225 46.0539 208.619 45.5184C208.068 45.032 207.633 44.5035 207.314 43.9329C207.003 43.3617 206.848 42.7764 206.851 42.1771C206.862 41.5773 207.073 41.0022 207.485 40.4519L205.334 38.5513C204.624 39.4481 204.213 40.4028 204.101 41.4157C203.993 42.4239 204.178 43.4402 204.657 44.4646C205.136 45.489 205.907 46.4712 206.971 47.4113C208.081 48.3922 209.187 49.0477 210.288 49.3776C211.393 49.7116 212.427 49.7482 213.391 49.4874C214.359 49.2307 215.199 48.6998 215.91 47.8949C216.474 47.2564 216.831 46.5958 216.981 45.913C217.136 45.2343 217.147 44.5601 217.014 43.8904C216.88 43.2208 216.659 42.5806 216.35 41.97C216.041 41.3593 215.709 40.7982 215.354 40.2866L214.285 38.6996C214.069 38.3849 213.857 38.0416 213.65 37.6695C213.448 37.2928 213.286 36.907 213.165 36.5121C213.054 36.1166 213.025 35.7248 213.08 35.3366C213.139 34.9524 213.318 34.5914 213.616 34.2537C213.972 33.8512 214.404 33.5949 214.913 33.4847C215.431 33.3739 215.983 33.4163 216.568 33.6119C217.157 33.8029 217.743 34.1559 218.326 34.6709C219.14 35.3902 219.654 36.1697 219.868 37.0093ZM230.165 43.2114L216.277 56.1251L214.329 54.0297L228.217 41.116L230.165 43.2114ZM237.189 59.0506C237.014 59.5593 236.756 60.0537 236.414 60.534L238.176 62.8823C238.82 62.1983 239.309 61.4458 239.642 60.6248C239.981 59.8 240.163 58.942 240.189 58.0506C240.218 57.1641 240.088 56.2745 239.796 55.3819C239.508 54.4941 239.057 53.6404 238.442 52.8206C237.705 51.8378 236.845 51.0668 235.863 50.5075C234.888 49.9494 233.833 49.6179 232.698 49.5129C231.57 49.4092 230.399 49.5506 229.184 49.937C227.97 50.3234 226.757 50.9704 225.547 51.8779C223.947 53.0779 222.781 54.4039 222.049 55.8559C221.322 57.3041 221.029 58.7813 221.171 60.2876C221.317 61.7988 221.904 63.2409 222.934 64.6138C223.852 65.8386 224.922 66.7344 226.142 67.3011C227.365 67.8727 228.645 68.0777 229.982 67.9159C231.328 67.7554 232.638 67.1974 233.912 66.2418L235.638 64.9473L231.166 58.9839L229.277 60.4006L232.087 64.148C231.288 64.7246 230.472 65.0712 229.638 65.188C228.774 65.3114 227.942 65.1904 227.143 64.825C226.348 64.4645 225.642 63.8718 225.023 63.0471C224.356 62.1581 223.982 61.2007 223.899 60.1747C223.816 59.1487 224.049 58.1171 224.599 57.08C225.148 56.0429 226.038 55.0632 227.268 54.141C228.492 53.2224 229.675 52.644 230.816 52.4057C231.965 52.1687 233.017 52.2285 233.972 52.5854C234.926 52.9422 235.724 53.5478 236.364 54.4021C236.742 54.9059 237.022 55.4177 237.203 55.9374C237.389 56.4622 237.477 56.9863 237.468 57.5098C237.465 58.0295 237.371 58.5432 237.189 59.0506ZM252.871 77.1801L236.099 86.0318L234.872 83.706L242.673 68.6892L242.591 68.5336L230.29 75.0254L228.955 72.4949L245.727 63.6432L246.963 65.9854L239.15 81.019L239.232 81.1746L251.548 74.6742L252.871 77.1801ZM255.523 113.474L255.036 110.489L261.83 109.381L262.317 112.366L255.523 113.474ZM255.032 110.463L252.219 109.416L254.659 102.994L257.476 104.067L255.032 110.463ZM257.547 120.7L253.185 115.335L255.497 113.479L259.877 118.788L257.547 120.7ZM250.753 121.809L247.936 120.736L250.368 114.262L253.159 115.339L250.753 121.809ZM249.889 111.329L245.535 106.015L247.865 104.102L252.193 109.42L249.889 111.329ZM243.573 115.371L243.095 112.437L249.863 111.333L250.342 114.267L243.573 115.371Z"
          />
        </svg>
      </header>
      <main className="flex w-full translate-y-[1080px] flex-col items-center bg-base pt-48 md:translate-y-[614px]">
        <div className="absolute inset-x-0 z-20 flex -translate-y-[632px] items-center justify-center overflow-x-hidden bg-[#BFDFB4] pt-32 md:inset-x-auto md:translate-x-48 md:bg-transparent md:pt-0">
          <div className="h-[440px] w-[490px] bg-[url('/images/header-photo-edgaras.png')] bg-cover bg-no-repeat object-cover dark:bg-[url('/images/header-photo-edgaras-dark-theme.png')]"></div>
        </div>
        <section className="flex items-center justify-center px-8">
          <p className="max-w-3xl text-center text-3xl leading-normal text-fg-neutral-faded">
            Hi! My name is Edgaras, and I am a freelancer specializing in UX/UI design,
            No-Code, and JavaScript development. I work with clients globally to create
            engaging websites, functional app prototypes, and automations that enable you
            to focus on what matters most.
          </p>
        </section>

        <section className="flex w-full flex-col items-center gap-16 pt-48">
          <p className="w-full text-center uppercase tracking-widest text-fg-neutral">
            Organizations I worked with:
          </p>
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-24 px-8 lg:grid-cols-7">
            <a href="https://www.kiloo.com/" className="place-self-center">
              <Image
                src={'/images/logos/kiloo.svg'}
                width={160}
                height={41.75}
                alt="Kiloo"
                className="h-12 opacity-50 transition hover:scale-105 hover:opacity-90"
              />
            </a>
            <a href="https://www.fck.dk/" className="place-self-center">
              <Image
                src={'/images/logos/fck.svg'}
                width={96}
                height={96}
                alt="F.C. København"
                className="h-12 opacity-50 transition hover:scale-105 hover:opacity-90"
              />
            </a>
            <a href="https://www.novonordisk.com/" className="place-self-center">
              <Image
                src={'/images/logos/novo-nordisk.svg'}
                width={256}
                height={34.83}
                alt="Ergosign"
                className="h-12 opacity-50 transition hover:scale-105 hover:opacity-90"
              />
            </a>
            <a href="https://www.ergosign.de/" className="place-self-center">
              <Image
                src={'/images/logos/ergosign.svg'}
                width={256}
                height={34.83}
                alt="Ergosign"
                className="h-12 opacity-50 transition hover:scale-105 hover:opacity-90"
              />
            </a>
            <a
              href="https://spirii.com/en/ev-drivers/spirii-go-app"
              className="place-self-center"
            >
              <Image
                src={'/images/logos/spirii.png'}
                width={66.74}
                height={32}
                alt="Spirii"
                className="opacity-50 transition hover:scale-105 hover:opacity-90"
              />
            </a>
            <a href="https://www.motosumo.com/" className="place-self-center">
              <Image
                src={'/images/logos/motosumo.png'}
                width={49}
                height={32}
                alt="Motosumo"
                className="opacity-50 transition hover:scale-105 hover:opacity-90"
              />
            </a>
            <a
              href="https://www.lava.nl/"
              className="place-self-center last:col-span-2 lg:last:col-auto"
            >
              <Image
                src={'/images/logos/lava.svg'}
                width={96}
                height={60.97}
                alt="Lava"
                className="h-12 opacity-50 transition hover:scale-105 hover:opacity-90"
              />
            </a>
          </div>
        </section>
        <section className="w-full overflow-hidden pt-64 pb-16 text-4xl tracking-tighter sm:text-6xl lg:text-8xl">
          <div className="relative flex -rotate-3 space-x-4">
            <h2 className="animate-[translateX-0--100_24s_linear_infinite] flex-nowrap space-x-2 whitespace-nowrap font-medium uppercase text-fg-neutral-faded/25 md:space-x-3">
              <span>Featured projects ✲</span>
              <span>Featured projects ✲</span>
            </h2>
            <h2 className="absolute animate-[translateX-100-0_24s_linear_infinite] flex-nowrap space-x-6 whitespace-nowrap font-medium uppercase text-fg-neutral-faded/25">
              <span>Featured projects ✲</span>
              <span>Featured projects ✲</span>
            </h2>
          </div>
        </section>
        <section className="mx-auto w-full max-w-screen-xl columns-1 gap-8 px-8 py-16 md:columns-2">
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Card {...project} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mx-auto w-full max-w-screen-xl px-8 py-48">
          <h2 className="text-5xl font-extrabold text-fg-neutral">
            What I can help you with
          </h2>
          {/*  <p>
            I build stuff, practical hands on design, rapid fast, experimentation driven
            approach
          </p> */}
          <AnimateStagger />
        </section>
        <section className="mx-auto w-full max-w-screen-xl px-8 pt-24 pb-48">
          <h2 className="text-5xl font-extrabold text-fg-neutral">How I work</h2>
          {/*     <p className="pt-4 text-center text-xl text-fg-neutral-faded">
            I focus on fully digital, remote and asynchonious work.
          </p> */}
          <div className="grid grid-cols-1 gap-16 pt-32 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={'/images/logos/figma.svg'}
                  width={48}
                  height={48}
                  alt="Figma"
                  title="Figma"
                  className="rounded-lg"
                />
                <h3 className="text-xl font-bold">Figma</h3>
              </div>
              <p className="text-lg text-fg-neutral">
                Whether I need to craft a quick <b>visual mockup</b> for a landing page or
                detail <b>UI design systems</b>, Figma is my go-to. With its real-time
                collaboration features and intuitive interface, I can work seamlessly with
                others and accelerate the design process.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={'/images/logos/miro.svg'}
                  width={48}
                  height={48}
                  alt="Miro"
                  title="Miro"
                  className="rounded-lg"
                />
                <h3 className="text-xl font-bold">Miro</h3>
              </div>
              <p className="text-lg text-fg-neutral">
                When a project requires more UX work, planning and collaboration, I turn
                to <b>Miro</b> or <b>FigJam</b>. These tools are excellent for{' '}
                <b>organizing research data</b>, <b>user journeys</b>, and{' '}
                <b>wireframes</b>, and simplify collaborative <b>design thinking</b>.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={'/images/logos/vscode.svg'}
                  width={48}
                  height={48}
                  alt="VS Code"
                  title="VS Code"
                  className="rounded-lg"
                />
                <h3 className="text-xl font-bold">Code</h3>
              </div>
              <p className="text-lg text-fg-neutral">
                Designers don’t have to code, but I do! My go-to tool for coding is{' '}
                <b>VS Code</b>, where I write <b>HTML</b>, <b>CSS</b> and{' '}
                <b>JavaScript</b>. I also enjoy writing <b>Tailwind CSS</b>, which allows
                me to build layouts quickly. When it comes to building full websites and
                apps, I turn to frameworks — <b>React</b> and <b>NextJS</b>. Knowing how
                to code not only enables me to build Minimal Viable Products, but also
                makes it easier for me to communicate and collaborate with other
                developers.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={'/images/logos/make.svg'}
                  width={48}
                  height={48}
                  alt="Make.com"
                  title="Make.com"
                  className="rounded-lg"
                />
                <h3 className="text-xl font-bold">No-Code</h3>
              </div>
              <p className="text-lg text-fg-neutral">
                When I&apos;m working on projects where speed and cost are priorities, I
                turn to no-code tools. <b>Zapier</b> and <b>Make</b> are excellent tools
                for workflow automation, while <b>Internal</b> is great for building
                internal tools. <b>Tally</b> is perfect for creating quick forms and
                surveys. For database prototyping, I prefer <b>Airtable</b> or{' '}
                <b>Notion</b>. I view these tools as building blocks that enable me to
                quickly bootstrap apps and automate processes, before diving into writing
                more resilient code or disrupting other developers.
              </p>
            </div>
          </div>
        </section>
        <PortfolioFooter />
      </main>
    </>
  )
}

function Card(data: Project) {
  return (
    <a
      /* href={`/portfolio/${data.slug}`} */
      href={data.meta.link.url}
      className="group relative mb-40 block w-full md:first:mt-32"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={data.image}
          fill
          alt={data.alt}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute -bottom-4 w-5/6 space-y-2 bg-base pr-4 pt-4 transition-transform duration-500 ease-out group-hover:-translate-y-4">
        <span className="text-lg font-semibold uppercase text-fg-primary">
          {data.project}
        </span>
        <h3 className="text-4xl font-bold leading-snug">{data.title}</h3>
      </div>
    </a>
  )
}
