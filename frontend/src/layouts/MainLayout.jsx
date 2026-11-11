import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import TopAnnouncementBar from './TopAnnouncementBar';
import MobileBottomNav from './MobileBottomNav';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-red-100 selection:text-red-700">
            {/* Top Announcement Bar */}
            <TopAnnouncementBar />

            {/* Dokanly Floating Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow w-full pb-16 md:pb-0">
                <Outlet />
            </main>

            {/* Dokanly E-Commerce Footer */}
            <div className="pb-14 md:pb-0">
                <Footer />
            </div>

            {/* Mobile Bottom Navigation Bar (Phone view only) */}
            <MobileBottomNav onOpenCategories={() => {
                const catEl = document.getElementById('categories');
                if (catEl) {
                    catEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = '/shop';
                }
            }} />
        </div>
    );
};

export default MainLayout;
