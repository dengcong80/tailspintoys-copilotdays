/**
 * Publisher data-access helpers used by Astro pages at build time.
 * These helpers are kept injectable so they can be reused in tests with an in-memory database.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Fetches every publisher as a lightweight summary object containing its stable id and display name.
 *
 * @param db - The Drizzle database instance to query.
 * @returns A list of publishers ordered alphabetically by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
