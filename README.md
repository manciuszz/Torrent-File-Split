# Torrent File Structure Split (Experiment)

The idea was to split a **'.torrent'** file structure before initiating a download on a seedbox or similar torrent file downloading services. 
Simple example would be removing all irrelevant junk (like ads, readme's etc..) from a movies torrent file.

> The experiments were carried out based on this repo [BEncode Online](https://github.com/Chocobo1/bencode_online).

# Conclusion

Although I did succeed in changing the .torrent file structure, the end result is altogether a new torrent file that has its own unique info hash, meaning we lose all the original .torrent files seeders :(

>*Important sources that helped to arrive to the conclusion.*
 - https://stackoverflow.com/questions/28348678/what-exactly-is-the-info-hash-in-a-torrent-file/28601408#28601408
 - https://allenkim67.github.io/programming/2016/05/04/how-to-make-your-own-bittorrent-client.html
