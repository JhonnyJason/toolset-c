#!/usr/bin/perl
use Cwd qw(cwd);
my $dir = cwd;

############################################################
my $specificThingyBasePath = $dir."/thingy-build-system/scripts/specificThingyInfo.js";
my $specificThingyBaseLink = $dir."/thingy-build-system/specificThingyInfo.js"; 

my $result = symlink($specificThingyBasePath, $specificThingyBaseLink);

############################################################
$result  = `node thingy-build-system/producePackageJason.js`;

if($result == 0) {
    print "package.json is ready to go :-)\n";
} else {
    print "An error occured!\nReturned: ".$result."\n";
}
