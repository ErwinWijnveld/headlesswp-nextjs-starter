import { FormContextProvider } from '../hooks/useForm';
import { OptionsContextProvider } from '../hooks/useOptions';
import Footer from './Footer';
import Header from './Header';
import Meta from './Meta';
import Alert from './posts/alert';

interface LayoutProps {
    preview?: boolean;
    children: React.ReactNode;
    optionsMenu?: any;
    seo?: {
        fullHead: string;
    };
    forms?: any;
}

export default function Layout({
    preview,
    children,
    seo,
    optionsMenu,
    forms,
}: LayoutProps) {
    return (
        <OptionsContextProvider value={optionsMenu?.optionsMenu}>
            <FormContextProvider value={forms || ''}>
                <Meta seo={seo} />
                <Header />
                <div className="min-h-screen">
                    <Alert preview={preview} />
                    <main className="relative z-[1]">{children}</main>
                </div>
                <Footer />
            </FormContextProvider>
        </OptionsContextProvider>
    );
}
