import { OptionsContextProvider } from "../hooks/useOptions";
import Footer from "./Footer";
import Header from "./Header";
import Meta from "./meta";
import Alert from "./posts/alert";

interface LayoutProps {
    preview?: boolean;
    children: React.ReactNode;
    optionsMenu?: any;
    seo?: {
        fullHead: string;
    };
}

export default function Layout({
    preview,
    children,
    seo,
    optionsMenu,
}: LayoutProps) {
    return (
        <OptionsContextProvider value={optionsMenu?.optionsMenu}>
            <Meta seo={seo} />
            <Header />
            <div className="min-h-screen">
                <Alert preview={preview} />
                <main className="relative z-[1]">{children}</main>
            </div>
            <Footer />
        </OptionsContextProvider>
    );
}
