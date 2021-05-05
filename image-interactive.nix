with import (
  # the below nixpkgs version is 2021-04-28 master; we use it because it supports fromImage in dockerTools.buildLayeredImage.
  builtins.fetchTarball "https://github.com/NixOS/nixpkgs/archive/f93ecc4f6bc60414d8b73dbdf615ceb6a2c604df.tar.gz"
) {
  system = "x86_64-linux";
};

let
  alpine = dockerTools.pullImage {
    imageName = "alpine";
    imageDigest = "sha256:def822f9851ca422481ec6fee59a9966f12b351c62ccb9aca841526ffaa9f748";
    sha256 = "0g5jh5bqg0hxs5f6vazpfnfbbd1hjj7rczizyxxzrcifvcgfys09";
    finalImageTag = "3.13.5";
    finalImageName = "alpine";
  };

  npm-help = writeTextFile {
    name = "getting-started-npm.txt";
    text = ''
      # Getting started
      Run the below commands to scaffold a new typescript CRA with npm
      $ npx create-react-app spa --template typescript
    '';
    executable = false;
    destination = "/help/getting-started-npm.txt";
  };

  # yarn-help = writeTextFile {
  #   name = "getting-started-yarn.txt";
  #   text = ''
  #     # Getting started'
  #     Run the below commands to scaffold a new typescript CRA with yarn pnp
  #     $ yarn create react-app spa --template typescript --use-pnp
  #     $ yarn add eslint-config-react-app # see https://stackoverflow.com/q/60431931
  #   '';
  #   executable = false;
  #   destination = "/help/getting-started-yarn.txt";
  # };

  dev-common = (callPackage ./zorgpkgs/envs/dev.nix {});

  env = pkgs.buildEnv {
    name = "wx-blog-env";
    paths = dev-common ++ [
      (callPackage ./zorgpkgs/pkgs/vim/neovim/neovim-plain.nix { name = "e"; })
      nodejs
      # (callPackage ./zorgpkgs/pkgs/yarn/yarn2.nix {})
    ];
  };
in
pkgs.dockerTools.buildLayeredImage {
  fromImage = alpine;
  name = "zorg-blog";
  tag = "latest";
  maxLayers = 5;
  contents = [ env npm-help ];
}
