         �   �      /���������b�J
�v�zZ�fċ݆            (�/� �m ��& `G� D$Y�,TK��|�Qގ��\m=�H��2�9���Y�p�ݛ=��)�d�X{\�	���kM\Ɏ��fU���,�y�mg_�
�p�x�����2ID�F��칁�O��~�DH"��\�������<!���H��dty'�h� �c�D�YUŁkF     �        �      0�    ����.�g��kY�çϜF`t>��               �   �   
MODULE = 'msgdb'

     �     �  �     18   ����c΍5�d����fx��p���            (�/� � T   ��CPP_SOURCES += [
    'nsDBFolderInfo.cpp',ImapMailDatabasesgsgHdrsgOfflineOperationThreadNews]


 m�N� �#{��i�ja�\��ʮ�    a     w  J     2�   ����v�%��)GM�w�I?/              �  �   kif CONFIG['MOZ_INCOMPLETE_EXTERNAL_LINKAGE']:
    FORCE_STATIC_LIB = True
else:
    LIBXUL_LIBRARY = True

    �     &  d     2�   ����~t���O����ޏ�~��b              J  J   LIBRARY_NAME = 'msgdb_s'

    �       `     3�   ������$���rE�"�jU��;��-               �     SOURCES += [
           N     3�   ����y����̹��i���w����3               �   �        #     /  �     4Q   ����z(QT�~��(��Ń0��              �  3   FINAL_LIBRARY = 'mail'
  4  N        R     �  �     x�   �����w/�f��	Zх�sF��l���            (�/�` � %�7��i  `��钤�����gn� ��@�Œ�H>I�o��=DJ�8�(�k �!�w���H�sa�ֻv��8>8M�S"PM5�&�Z�-ȭ\hR*��d	Z��tl�����G�	 m�N� �#{��i�ja�\nw>    �     0       }i   �����k���"�U�}M˿�����              \  \   $    "nsMsgDatabaseEnumerators.cpp",
         ;  3   	  �P   	�����\��"�)��:]�                   /
XPCOM_MANIFESTS += [
    "components.conf",
]
