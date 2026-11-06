import React, { useState } from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const ErrorAlert = ({ error }) => {
    const [visible, setVisible] = useState(true);

    if (!error || !visible) return null;

    return (
        <div
            role="alert"
            className="w-full max-w-xl mx-auto my-4 relative rounded-xl bg-red-50 border border-red-200 p-4 shadow-sm"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                        <h4 className="text-sm font-semibold text-red-800">Notice</h4>
                        <p className="text-xs text-red-700 mt-0.5">{error}</p>
                    </div>
                </div>

                <button
                    onClick={() => setVisible(false)}
                    aria-label="Close alert"
                    className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-100 transition-colors"
                >
                    <FiX className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ErrorAlert;