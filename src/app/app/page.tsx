import { Metadata } from 'next';
import MainLayout from './components/MainLayout';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'CatunBond',
        generator: 'Next.js',
        applicationName: 'CatunBond',
        referrer: 'origin-when-cross-origin',
        keywords: ['CatunBond', 'Message', 'Chat', 'Voice', 'Voice Chat', 'Modern', 'Chatting Platform', 'CB', 'cb', 'Cb', 'Cat', 'Kitten', 'Cat Chat', 'CatunBond Chat', 'Messaging', 'App'],
        authors: [{ name: 'Ori' }],
        creator: 'Ori',
        publisher: 'Ori',
        description: 'CatunBond is a modern chatting platform that allows you to chat with your friends and family.',
        openGraph: {
            title: 'CatunBond',
            description: 'CatunBond is a modern chatting platform that allows you to chat with your friends and family.',
            url: 'https://catunbond.com',
            siteName: 'CatunBond',
        },
        category: 'tecnology',
        icons: {
            icon: '/app_icons/app_icon_blue.png',
        },
    }
}
export default function Page() {
    return (
        <>
            <MainLayout />
        </>
    )
}