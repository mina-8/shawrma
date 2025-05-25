import '../css/app.css';
import './bootstrap';
import '../js/I18n/i18n'
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import AuthLayout from './Layouts/AuthLayout';
import LanguageContext from './Layouts/LanguageContext';


const appName = import.meta.env.VITE_APP_NAME || 'BSCO';

createInertiaApp({
    title: (title) => `${appName} - ${title}`,

    resolve: (name) => resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx'),
    ).then((module: any) => {
        const page = module.default;
        page.layout = page.layout || ((page: any) => <AuthLayout>{page}</AuthLayout>);
        return module;
    }
    ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LanguageContext>
                <App {...props} />
            </LanguageContext>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
