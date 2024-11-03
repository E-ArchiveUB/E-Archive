import React from 'react';

export default function Index({ mailInfo }) {
    return (
        <div>
            {/* You can map through mailInfo here or pass it to other components */}
            <pre>{JSON.stringify(mailInfo, null, 2)}</pre>
        </div>
    );
}