         �   �      /���������b�J
�v�zZ�fċ݆            (�/� �m ��& `G� D$Y�,TK��|�Qގ��\m=�H��2�9���Y�p�ݛ=��)�d�X{\�	���kM\Ɏ��fU���,�y�mg_�
�p�x�����2ID�F��칁�O��~�DH"��\�������<!���H��dty'�h� �c�D�YUŁkF     �     "   �      0�    �����f(�3��t���L��L���               �   �   
MODULE = 'newsblog'

     �     Q  D     1:   ����z����V��wjB�?�丗��            (�/� WE �   �KEXTRA_COMPONENTS += [
    'js/newsblog.js',manifest',
]

 ��˙�    )       /     3�   ����?:{ ��N���X�88�6&�n               �   �        5     (  K     4W   ����Y��!g�4)T"ٷ] J��              /  /   JAR_MANIFESTS += ['jar.mn']
    ]     A  �     4�   �����$Ư��슆��f��)              /  /   5EXTRA_JS_MODULES += [
    'content/FeedUtils.jsm',
]
    �     :  �     EJ   �����#|I�vZ7f� &@�F2              �  �   .
FINAL_TARGET_FILES.isp += [
    'rss.rdf',
]
    �       �     EO   �����xd�~^�dD?̮[�'�F              �  �        �     :  �     F�   �����s���tSM��*��l�#�Ʀ              �  �   .
FINAL_TARGET_FILES.isp += [
    'rss.rdf',
]
         t  �     R�   ���������"ů��q�v��              d  d   
  �  �   [if not CONFIG['MOZ_THUNDERBIRD']:
    FINAL_TARGET_FILES.isp += [
        'rss.rdf',
    ]
    �       �   	  ]�   	���������c6>��\��^�z�              �  �        �     #  �   
  gS   
������_����t�V��[5�              �  �   TEST_DIRS += ['test']

    �     �  �      n   �������R�g:oW���/D�>            (�/� �� �   �
EXTRA_JS_MODULES += [
    'content/FeedUtils.jsm',NewsBlog]

XPCOM_MANIFESTmponents.confJAR'jar.mn']
TEST_DIR'test']

 2fPuW��SA��.'�$�uD    ]     �  �      vr   ����/�c��^(>��3z�"Лd            (�/� � T   ��
EXTRA_JS_MODULES += [
    'FeedUtils.jsm',NewsBlog]

XPCOM_MANIFESTcomponents.confJAR'jar.mn']SHELL_Ttest/unit/xpcshell.ini']

	 J4�	���R���̑8�>sY         �  �     x�   ����z�m�
 �m�zGҍ���&9�W            (�/� � 	   �  #   )    "FeedUtils.jsm",
NewsBlog  ;  R   components.confU  �   SJAR_MANIFESTS += ["jar.mn"]
XPCSHELL_TESTStest/unit/xpcshell.ini"]
 ����:ԥ73�I    �     t  �     {]   ������QM�M$,�[~�H��t            (�/� �] �  q  �   
BROWSER_CHROME_MANIFESTS += [
    "test/browser.ini",
]
XPCSHELL_Tunit/xpcshell A?�b���=    %     ;  *     |�   ����L�wg�y9���5�jV���j            (�/� F� d   �:    "Feed.jsm",
ItemParser.jsm",
 79��3G    `     $  .     ��   ����M}���<�b3,�/����              I  ]       "NewsBlog.sys.mjs",
    �     E  >     �f   ������A��R���8FN�v�
�H            (�/� k� �   �  I   _    "Feed.sys.mjs",
ItemParserUtilsl��R�Ӟ    �     T  �     �y   ������h��^j������'��hi               �   �   Hwith Files("**"):
    BUG_COMPONENT = ("Mailnews Core", "Feed Reader")

