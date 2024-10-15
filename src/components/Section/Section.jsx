import React, { useEffect, useState } from 'react';
import styles from "./Section.module.css";
import { CircularProgress } from '@mui/material';
import Card from '../Card/Card';
import Carousel from '../Corousel/Corousel';
import Filters from '../Filters/Filter';

function Section({ title, data, filterSource, type }) {
    const [carouselToggle, setCarouselToggle] = useState(true);
    const [filters, setFilters] = useState([{ key: 'all', label: 'All' }]);
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

    const handleCarouselToggle = () => {
        setCarouselToggle(prev => !prev);
    };

    useEffect(() => {
        const fetchFilters = async () => {
            if (filterSource) {
                try {
                    const response = await filterSource();
                    const { data: newFilters } = response;
                    setFilters(prevFilters => [...prevFilters, ...newFilters]);
                } catch (error) {
                    console.error("Failed to fetch filters:", error);
                }
            }
        };

        fetchFilters();
    }, [filterSource]);

    const showFilters = filters.length > 1;
    
    const cardToRender = data.filter(card => {
        if (!showFilters || selectedFilterIndex === 0) {
            return true; // No filter applied
        }
        return card.genre.key === filters[selectedFilterIndex].key; // Apply filter
    });

    return (
        <div>
            <div className={styles.header}>
                <h3>{title}</h3>
                {!showFilters && (
                    <h4 onClick={handleCarouselToggle} className={styles.toggle}>
                        {carouselToggle ? "Show All" : "Collapse All"}
                    </h4>
                )}
            </div>
            {showFilters && (
                <div className={styles.filterWrapper}>
                    <Filters
                        filters={filters}
                        selectedFilterIndex={selectedFilterIndex}
                        setSelectedFilterIndex={setSelectedFilterIndex}
                    />
                </div>
            )}
            {cardToRender.length === 0 ? (
                <CircularProgress />
            ) : (
                <div className={styles.cardWrapper}>
                    {carouselToggle ? (
                        <Carousel
                            data={cardToRender}
                            renderComponent={(data) => <Card data={data} type={type} />}
                        />
                    ) : (
                        <div className={styles.wrapper}>
                            {cardToRender.map(ele => (
                                <Card data={ele} type={type} key={ele.id} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Section;
