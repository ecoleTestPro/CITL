import { Link } from '@inertiajs/react';
import { Tag } from '../types';

interface TagCloudProps {
    tags: Tag[];
}

export const TagCloud = ({ tags }: TagCloudProps) => {
    return (
        <div>
            <h3 className="text-heading-5 text-secondary dark:text-foreground">Tags</h3>
            <div className="mt-6 flex flex-wrap gap-4">
                {tags.map((tag) => (
                    <Link key={tag.slug} href={tag.url}>
                        <span className="badge badge-white dark:!border-stroke-5 font-medium dark:!border dark:!bg-transparent dark:!text-foreground/60 dark:backdrop-blur-[17px]">
                            {tag.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
