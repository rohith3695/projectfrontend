import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Ensure this path is correct

const DynamicSEO = ({ pageId, defaultData }) => {
    const [seoData, setSeoData] = useState(defaultData || {});
    const [globalSettings, setGlobalSettings] = useState({ domain: 'ryleni.com', protocol: 'https' });

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const globalRef = doc(db, 'seo_settings', 'global');
                const globalSnap = await getDoc(globalRef);
                if (globalSnap.exists()) {
                    setGlobalSettings((prev) => ({ ...prev, ...globalSnap.data() }));
                }

                const pageRef = doc(db, 'seo_settings', pageId);
                const pageSnap = await getDoc(pageRef);
                
                if (pageSnap.exists()) {
                    const data = pageSnap.data();
                    setSeoData({
                        title: data.title || defaultData?.title || '',
                        description: data.description || defaultData?.description || '',
                        keywords: data.keywords || defaultData?.keywords || '',
                        ogImage: data.ogImage || defaultData?.ogImage || '',
                        canonical: data.canonical || defaultData?.canonical || '',
                        noindex: data.noindex || false,
                        schema: data.schema || null,
                    });
                }
            } catch (err) {
                console.error("Error fetching SEO data for", pageId, err);
            }
        };

        if (pageId) {
            fetchSEO();
        }
    }, [pageId, defaultData]);

    // Handle full URL for image since og:image requires absolute URL
    const ogImageUrl = seoData.ogImage && !seoData.ogImage.startsWith('http') 
        ? `${globalSettings.protocol}://${globalSettings.domain}${seoData.ogImage.startsWith('/') ? '' : '/'}${seoData.ogImage}`
        : seoData.ogImage;

    return (
        <Helmet>
            {seoData.title && <title>{seoData.title}</title>}
            {seoData.title && <meta property="og:title" content={seoData.title} />}
            {seoData.title && <meta name="twitter:title" content={seoData.title} />}
            
            {seoData.description && <meta name="description" content={seoData.description} />}
            {seoData.description && <meta property="og:description" content={seoData.description} />}
            {seoData.description && <meta name="twitter:description" content={seoData.description} />}
            
            {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
            
            {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
            {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}
            {ogImageUrl && <meta name="twitter:card" content="summary_large_image" />}
            
            {seoData.canonical && <link rel="canonical" href={seoData.canonical} />}
            
            {seoData.noindex && <meta name="robots" content="noindex, nofollow" />}

            {seoData.schema && Object.keys(seoData.schema).length > 0 && (
                <script type="application/ld+json">
                    {JSON.stringify(seoData.schema)}
                </script>
            )}
        </Helmet>
    );
};

export default DynamicSEO;
