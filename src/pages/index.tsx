import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Flexible from '../components/Flexible';
import HomeHero from '../components/HomeHero';
import Layout from '../components/layout';
import HomepageNav from '../components/presets/HomepageNav';
import { useNotification } from '../hooks/useNotification';
import { getPageWithPreview } from '../lib/queries/pages';

export default function Index({ page, optionsMenu, preview, gfForm }) {
    const router = useRouter();
    const { showNotification } = useNotification();
    const [screen, setScreen] = useState(false);

    const changeScreen = () => {
        setScreen((prev) => !prev);
    };

    const forms = [gfForm];

    if (!router.isFallback && !page?.slug) {
        if (screen) {
            return <HomepageNav isPage={false} />;
        }
        return <HomeHero changeScreen={changeScreen} />;
        // return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout preview={preview} optionsMenu={optionsMenu} forms={forms}>
            {/* Remove homepagenav when you start developing */}
            {screen ? (
                <HomepageNav isPage={false} />
            ) : (
                <HomeHero changeScreen={changeScreen} />
            )}

            <Flexible flexible={page?.flexiblePage} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({
    params,
    preview = false,
    previewData,
}) => {
    const data = await getPageWithPreview('/', preview, previewData);

    return {
        props: {
            preview,
            page: data.page,
            optionsMenu: data.optionsMenu,
            gfForm: data.gfForm,
        },
        revalidate: 10,
    };
};
