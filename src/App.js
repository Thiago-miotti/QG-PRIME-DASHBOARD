// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import {StyledChart} from './components/chart';
import {AuthProvider} from "./context/AuthProvider";

// ----------------------------------------------------------------------

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ScrollToTop/>
                <StyledChart/>
                <Router/>
            </AuthProvider>
        </ThemeProvider>
    );
}
