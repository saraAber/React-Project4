import React from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
// import rtlPlugin from 'stylis-plugin-rtl';
// import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// import Header from '../src/components/Header';
// import Hero from './components/HomePage/Hero';
// import Features from './components/HomePage/Features';
// import TargetAudience from './components/HomePage/TargetAudience';
// import CtaSection from './components/CtaSection';
// import Footer from './components/HomePage/Footer';
import { RouterProvider } from 'react-router-dom';
import { Router } from './router';
import { UserProvider } from './context/userContext';



// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin],
// });

// Create a theme instance with RTL support
// let theme = createTheme({
//   direction: 'rtl',
//   palette: {
//     primary: {
//       main: '#4a6fa5',
//     },
//     secondary: {
//       main: '#f8c146',
//     },
//     background: {
//       default: '#f5f7fa',
//     },
//   },
//   typography: {
//     fontFamily: [
//       'Heebo',
//       'Assistant',
//       'Rubik',
//       'Arial',
//       'sans-serif',
//     ].join(','),
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           fontWeight: 'bold',
//         },
//       },
//     },
//   },
// });

// theme = responsiveFontSizes(theme);



function App() {
  return (
    // <CacheProvider value={cacheRtl}>
      // <ThemeProvider theme={theme}>
      // <ThemeProvider theme={createTheme({ direction: 'ltr' })}>
      //   <CssBaseline />
      //   <div dir="rtl">
      <UserProvider>

          <RouterProvider router={Router} /> {/* כאן נטען ה-Router */}
          </UserProvider>
      //   </div>
      //  </ThemeProvider>
    // </CacheProvider>
  //  <UserContext>
  //   <>
  //   <Home/>
  //   </>
  // </UserContext>
    // <UserProvider>
    //   <Router>
    //     <Routes>

    //       <Route path="/" element={<Home />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/logup" element={<Signup />} />
    //       <Route path="/profile" element={<Profile />} />
    //       <Route path='/recipes' element={<Recipes />} />
    //       <Route path='/addRecipe'element={<AddRecipe/>}/>
    //       <Route path='/showRecepies'element={<ShowRecipes/>}/>
    //       {/* <Route path='/editRecipe'element={<EditRecipe/>}/> */}
    //       <Route path='/editRecipe/:id' element={<EditRecipe/>}/>

    //       {/* <Route path="/" element={<Recepies />} /> */}
    //     </Routes>
    //   </Router>
    // </UserProvider>
  )
}

export default App
