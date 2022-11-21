import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {



  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src="/assets/phygitalLogo.png"
      sx={{ width: 240, height: 130, cursor: 'pointer', ...sx }}
    />
  );

//   const logo = (
//     <Box
//       ref={ref}
//       component="div"
//       sx={{
//         width: 150,
//         height: 150,
//         display: 'flex',
//
//         ...sx,
//       }}
//       {...other}
//     >
//       <svg
//         version="1.0"
//         xmlns="http://www.w3.org/2000/svg"
//         width="100%"
//         height="100%"
//         viewBox="0 0 426.000000 168.000000"
//         preserveAspectRatio="xMidYMid meet"
//       >
//         <g transform="translate(0.000000,168.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
//           <path
//             d="M562 986 c-105 -183 -192 -336 -192 -339 0 -4 46 -7 103 -7 91 0 104
// 2 115 20 12 19 10 20 -68 20 -44 0 -80 4 -80 8 0 8 303 538 313 548 3 3 69
// -107 148 -243 78 -136 144 -249 145 -251 1 -2 11 -2 23 0 18 3 0 37 -144 286
// -90 156 -165 285 -167 287 -2 2 -90 -146 -196 -329z"
//           />
//           <path
//             d="M990 1248 c-24 -40 -48 -83 -56 -94 -11 -18 -11 -25 0 -39 12 -17 17
// -12 50 48 21 37 41 69 44 71 7 4 322 -533 322 -548 0 -3 -128 -6 -285 -6 -274
// 0 -285 -1 -295 -20 -11 -20 -8 -20 320 -20 181 0 330 2 330 4 0 3 -87 156
// -194 341 l-194 336 -42 -73z"
//           />
//           <path
//             d="M2626 1074 c-33 -32 -13 -74 36 -74 40 0 59 41 33 70 -22 24 -48 26
// -69 4z"
//           />
//           <path
//             d="M1730 830 l0 -250 45 0 45 0 0 38 c0 28 7 45 24 61 l24 23 49 -61
// c48 -61 48 -61 101 -61 l52 0 -76 95 -75 96 58 67 c96 110 93 102 35 102 l-51
// 0 -68 -86 -68 -86 -3 156 -3 156 -44 0 -45 0 0 -250z"
//           />
//           <path
//             d="M2160 830 l0 -250 40 0 40 0 0 108 c0 121 16 170 62 186 35 12 82 -7
// 97 -40 6 -14 11 -76 11 -139 l0 -115 40 0 40 0 0 138 c0 147 -6 171 -51 205
// -39 28 -120 28 -159 -1 -16 -12 -32 -22 -35 -22 -3 0 -5 41 -5 90 l0 90 -40 0
// -40 0 0 -250z"
//           />
//           <path
//             d="M674 699 l-170 -294 384 -3 c212 -1 387 -1 389 2 2 2 -21 46 -50 97
// -38 66 -61 95 -76 97 -11 2 -21 1 -21 -1 0 -3 18 -36 40 -75 22 -38 40 -72 40
// -76 0 -3 -144 -6 -321 -6 l-321 0 22 38 c12 20 79 135 148 255 105 182 123
// 221 115 239 -8 19 -32 -17 -179 -273z"
//           />
//           <path
//             d="M2957 926 c-44 -22 -47 -22 -47 -5 0 16 -8 19 -45 19 l-45 0 0 -240
// 0 -240 45 0 45 0 0 80 0 81 28 -21 c56 -41 146 -36 208 12 59 47 81 156 45
// 233 -22 49 -48 73 -98 91 -55 19 -83 17 -136 -10z m122 -72 c55 -39 62 -130
// 14 -178 -79 -80 -210 -5 -189 107 10 55 50 87 105 87 27 0 56 -7 70 -16z"
//           />
//           <path
//             d="M3442 940 c-101 -24 -168 -133 -142 -229 39 -147 243 -190 343 -72
// 23 28 47 86 47 116 0 56 -56 142 -109 169 -36 19 -99 26 -139 16z m124 -104
// c26 -26 34 -42 34 -70 0 -68 -50 -126 -110 -126 -29 0 -76 26 -94 52 -33 47
// -11 143 38 167 12 5 38 10 60 10 30 1 45 -6 72 -33z"
//           />
//           <path d="M2620 760 l0 -180 40 0 40 0 0 180 0 180 -40 0 -40 0 0 -180z" />
//         </g>
//       </svg>
//     </Box>
//   );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
