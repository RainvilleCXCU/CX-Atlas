import Heading from "components/Heading";
import Link from "next/link";
import React, { Fragment } from "react";

interface CategoriesProps {
	title?: string;
    categories?;
}

const Categories: React.FC<CategoriesProps> = ({ title = 'Categories', categories }) => {
	return (
        <>
            <Heading level="h3">{ title }</Heading>
            <ul className='categories'>
            {categories.map((category, index) => (
                <Fragment key={`category-${index}-${category.name}`}>
                { category.uri !== '' && category.count > 0 &&
                    <li className='cat-item' key={`category-${index}-${category.name}2`}>
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
