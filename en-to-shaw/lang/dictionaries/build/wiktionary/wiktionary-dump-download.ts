import download from 'download';
import { existsSync } from 'fs-extra';
import { join as joinPaths } from 'path';
import { throwError } from '../utils/throw-error';
import {
  WiktionaryEdition,
  wiktionaryEditionToString,
} from './wiktionary-edition';
import { downloadFile } from '../utils/download-file';
import { downloadsDir } from '../directories';

async function getWiktionaryDownloadUrl(
  edition: WiktionaryEdition,
): Promise<string> {
  const baseUrl = 'https://dumps.wikimedia.org';
  const artifactId = `${edition}wiktionary`;

  // Determine timestamp of latest dump
  const backupIndex = (
    await download(`${baseUrl}/backup-index.html`)
  ).toString();
  const timestamp =
    backupIndex.match(new RegExp(`<a href="${artifactId}/(\\d+)"`))?.[1] ??
    throwError(`No backup found for ${wiktionaryEditionToString(edition)}.`);

  return `${baseUrl}/${artifactId}/${timestamp}/${artifactId}-${timestamp}-pages-articles.xml.bz2`;
}

function getXmlFilePath(edition: WiktionaryEdition): string {
  return joinPaths(downloadsDir, `${edition}.xml`);
}

export async function getWiktionaryDumpFilePath(
  edition: WiktionaryEdition,
): Promise<string> {
  const filePath = getXmlFilePath(edition);
  if (!existsSync(filePath)) {
    const url = await getWiktionaryDownloadUrl(edition);
    await downloadFile(url, filePath, {
      description: `dump for ${wiktionaryEditionToString(edition)}`,
      decompressBzip2: true,
    });
  }

  return filePath;
}
