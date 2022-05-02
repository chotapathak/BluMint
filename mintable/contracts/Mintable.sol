//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "./contracts/token/ERC721/ERC721.sol";
// import "./contracts/access/Ownable.sol";
import './CustomERC.sol';

contract Mintable is DERC{

    using Strings for uint256;
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnable;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable  {
        mintPrice = 0.03 ether;
        totalSupply = 0;
        maxPerWallet = 3;
        maxSupply = 3333;
    }
    function setPublicMintable(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnable = isPublicMintEnabled_;
    }
    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }    
    function  tokenURI(uint256 tokenId_) public view returns(string memory){
        require(_exists(tokenId_),'token does not exists');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_),".json"));   
    }
    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}('');
        require(success, 'Withdraw Failed');
    }
    function mint(uint256 quantity) public payable {
        require(isPublicMintEnable,'minting not enabled');
        require(msg.value == quantity * mintPrice, 'wrong minting value');
        require(totalSupply + quantity <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity <= maxPerWallet, 'exceed max value');

        for (uint i = 0; i < quantity; i++){
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}


// 0xCcfD0F4A13b2b1c296D5cbad82B8e046081aA1BA