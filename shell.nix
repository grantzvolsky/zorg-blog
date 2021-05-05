{ pkgs ? import <nixpkgs> {}, name ? "zorg-blog-shell" }:
with pkgs;

mkShell {
  inherit name;
  nativeBuildInputs = callPackage ~/my_root/repos/com/github/grantzvolsky/zorgpkgs/envs/dev.nix {};
}
