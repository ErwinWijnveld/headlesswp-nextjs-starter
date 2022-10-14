import Alert from "./posts/alert";
import Footer from "./posts/footer";
import Meta from "./posts/meta";

interface LayoutProps {
    preview?: boolean;
    children: React.ReactNode;
    seo?: {
        fullHead: string;
    };
}

export default function Layout({ preview, children, seo }: LayoutProps) {
    return (
        <>
            <Meta seo={seo} />
            <div className="min-h-screen">
                <Alert preview={preview} />
                <main>{children}</main>
            </div>
            <Footer />
        </>
    );
}
