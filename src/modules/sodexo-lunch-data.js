
    
    const getSodexoLunchMenu = async (date) => {
        let response;
        try {
            response = await fetch(`https://www.sodexo.fi/ruokalistat/output/daily_json/152/${date}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('getSodexoLunchMenu error', error.message);
        }

        let repos = await response.json();
        return repos;
    };

    const sodexoData = {
        getSodexoLunchMenu
    };

    export default sodexoData;
    