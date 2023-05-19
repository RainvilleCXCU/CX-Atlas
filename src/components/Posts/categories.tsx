import { client } from "client";
import Link from "next/link";
import React, { Fragment } from "react";

interface CategoriesProps {
	title?: string;
}

const Categories: React.FC<CategoriesProps> = ({ title = 'Categories' }) => {
    const { useQuery } = client;
    const categories = useQuery().categories().nodes;
	return (
        <>
            <h4>{ title }</h4>
            <ul className='categories'>
            {categories.map((category, index) => (
                <Fragment key={`category-${index}-${category.name}`}>
                { category.uri && category.count > 0 &&
                    <li className='cat-item'>
                    <Link href={category.uri}>{category.name}</Link>
                    </li>
                }
                </Fragment>
            ))}
            </ul>
        </>
	);
};

export default Categories;