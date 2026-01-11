#!/bin/bash
pnpm run pull
cd toolset
./prepareThingy.pl
cd ..
pnpm install

echo 0