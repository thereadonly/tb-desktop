         �   �      <����������b�J
�v�zZ�fċ݆            (�/� �m ��& `G� D$Y�,TK��|�Qގ��\m=�H��2�9���Y�p�ݛ=��)�d�X{\�	���kM\Ɏ��fU���,�y�mg_�
�p�x�����2ID�F��칁�O��~�DH"��\�������<!���H��dty'�h� �c�D�YUŁkF     �     )         <�    ����O�H�	h(V.H�n�]�k�W               �   �   
JAR_MANIFESTS += ['jar.mn']
     �      �     <�   ����U��=0��ø�r�	E��'�            (�/�`� % ��1-�'30�03pdM�72�H��5I�Pd�2s�$R"Y��Z��
4i$�Q��J�i@�`~Z�V2�it��p*�E�
MDى(-�b Y��W4�e՟W:��_,Q�Qe���N�\G��瑫�@�W[a�D�M��MT8���}�5����iΐ]7?�����+���0������,;w�v�p.t��C�$ H�s��Q� c���n�i�460k���a�/�I	�Q�����aJ���6s�7�    �     T  �     @�   ����ݤi�����h:�;=X=�E            (�/� W] �  �   � ?
USE_LIBS += [
    'mozalloc',xpcomglue_sul',
]
 6����v�/p    A       �     A   ����>v�.��Iy\��� 휝��              �  �       'nspr',
    Y     a  Z     A   �������Z�0���7�,�a��V��            (�/� �� 4  � *    OS_LIBS += [
'shell32',]
  � @CONFIG['TK_LIBS']
XLIBS']
 ��CV��ڼҴ��e    �     6  �     A   ����%�ض��ߢ,m5\����9��              O  O   *    CXXFLAGS += CONFIG['MOZ_GTK2_CFLAGS']
    �     ;  �     A   �����k�|���7���;�v,e&            (�/� C� d  � 7    RCFILE = resources.rc
ESes

 >ӳ�1G    +     A  �     A!   ����{�hc\�J���RUq��            (�/� F� �  �  �   :    RCFILE = 'resources.rc'
ESes'
 @%�_�    l     0  �     Az   ����a���\ށʇ�v���ѱ�              �  �   $XPCOMBinaryComponent('trayToolkit')
    �       �   	  D�   	������HK�Y�W=�k";A���              u  �        �     +  �   
  F�   
�����:dNr]���ٌe|��              �  "   elif CONFIG['MOZ_WIDGET_GTK']:
    �     8  �     J�   ����Y�+ۗ۔�;�O�#��u{s              �     ,elif 'gtk' in CONFIG['MOZ_WIDGET_TOOLKIT']:
         .  W     R   ����D [�g4K�\�c#զ�/%9              �  �   FINAL_LIBRARY = 'xul'
  e  �    